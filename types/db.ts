import { SessionProps } from './index';

export interface StoreData {
    accessToken?: string;
    scope?: string;
    storeHash: string;
}

export interface ConfigData {
    storeHash: string;
    config: Record<string, any>;
    updatedAt?: Date;
}

export interface UserData {
    email: string;
    username?: string;
}

export interface Db {
    hasStoreUser(storeHash: string, userId: string): Promise<boolean> | boolean;
    setUser(session: SessionProps): Promise<void>;
    setStore(session: SessionProps): Promise<void>;
    setStoreUser(session: SessionProps): Promise<void>;
    getStoreToken(storeId: string): Promise<string> | null;
    deleteStore(session: SessionProps): Promise<void>;
    deleteUser(session: SessionProps): Promise<void>;
    getConfig(storeHash: string): Promise<Record<string, any> | null>;
    setConfig(storeHash: string, config: Record<string, any>): Promise<void>;
}
