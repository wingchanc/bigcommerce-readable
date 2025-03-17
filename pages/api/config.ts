import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, bigcommerceClient } from '../../lib/auth';
import db from '../../lib/db';

export default async function config(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    try {
        // Get session from cookies or query parameters
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized - No session found' });
        }

        const { storeHash } = session;
        if (!storeHash) {
            return res.status(400).json({ error: 'Store hash not found in session' });
        }

        switch (method) {
            case 'GET':
                const config = await db.getConfig(storeHash);
                res.status(200).json(config || {});
                break;

            case 'POST':
                const { config: newConfig } = req.body;
                await db.setConfig(storeHash, newConfig);
                res.status(200).json({ success: true });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling config:', error);
        res.status(500).json({ error: 'Error handling configuration' });
    }
} 