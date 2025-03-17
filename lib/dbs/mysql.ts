import mysql, { PoolOptions } from 'mysql2';
import { promisify } from 'util';
import { SessionProps, StoreData } from '../../types';

const MYSQL_CONFIG: PoolOptions = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    ...(process.env.MYSQL_PORT && { port: Number(process.env.MYSQL_PORT) }),
};

// For use with DB URLs
// Other mysql: https://www.npmjs.com/package/mysql#pooling-connections
const dbUrl = process.env.DATABASE_URL;
const pool = dbUrl ? mysql.createPool(dbUrl) : mysql.createPool(MYSQL_CONFIG);
const query = promisify(pool.query.bind(pool));

// Use setUser for storing global user data (persists between installs)
export async function setUser({ user }: SessionProps) {
    if (!user) return null;

    const { email, id, username } = user;
    const userData = { email, userId: id, username };

    await query('REPLACE INTO users SET ?', userData);
}

export async function setStore(session: SessionProps) {
    const { access_token: accessToken, context, scope } = session;
    // Only set on app install or update
    if (!accessToken || !scope) return null;

    const storeHash = context?.split('/')[1] || '';
    const storeData: StoreData = { accessToken, scope, storeHash };

    await query('REPLACE INTO stores SET ?', storeData);
}

// Use setStoreUser for storing store specific variables
export async function setStoreUser(session: SessionProps) {
    const { access_token: accessToken, context, owner, sub, user: { id: userId } } = session;
    if (!userId) return null;

    const contextString = context ?? sub;
    const storeHash = contextString?.split('/')[1] || '';
    const sql = 'SELECT * FROM storeUsers WHERE userId = ? AND storeHash = ?';
    const values = [String(userId), storeHash];
    const storeUser = await query(sql, values);

    // Set admin (store owner) if installing/ updating the app
    // https://developer.bigcommerce.com/api-docs/apps/guide/users
    if (accessToken) {
        // Create a new admin user if none exists
        if (!storeUser.length) {
            await query('INSERT INTO storeUsers SET ?', { isAdmin: true, storeHash, userId });
        } else if (!storeUser[0]?.isAdmin) {
            await query('UPDATE storeUsers SET isAdmin=1 WHERE userId = ? AND storeHash = ?', values);
        }
    } else {
        // Create a new user if it doesn't exist (non-store owners added here for multi-user apps)
        if (!storeUser.length) {
            await query('INSERT INTO storeUsers SET ?', { isAdmin: owner.id === userId, storeHash, userId });
        }
    }
}

export async function deleteUser(session: SessionProps) {
    const { user } = session;
    if (!user) return null;
    await query('DELETE FROM users WHERE userId = ?', user.id);
}

export async function hasStoreUser(storeHash: string, userId: string): Promise<boolean> {
    const [result] = await query(
        'SELECT 1 FROM storeUsers WHERE storeHash = ? AND userId = ?',
        [storeHash, userId]
    );
    return !!result;
}

export async function getStoreToken(storeHash: string): Promise<string | null> {
    const [result] = await query('SELECT accessToken FROM stores WHERE storeHash = ?', [storeHash]);
    return result ? result.accessToken : null;
}

export async function deleteStore({ store_hash: storeHash }: SessionProps) {
    await query('DELETE FROM stores WHERE storeHash = ?', storeHash);
}

export async function getConfig(storeHash: string): Promise<Record<string, any> | null> {
    const [result] = await query('SELECT config FROM configs WHERE storeHash = ?', [storeHash]);
    if (!result) return null;
    return JSON.parse(result.config);
}

export async function setConfig(storeHash: string, config: Record<string, any>): Promise<void> {
    const configString = JSON.stringify(config);
    await query(
        'INSERT INTO configs (storeHash, config) VALUES (?, ?) ON DUPLICATE KEY UPDATE config = ?',
        [storeHash, configString, configString]
    );
}
