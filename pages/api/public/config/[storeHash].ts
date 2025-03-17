import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { storeHash } = req.query;

    // Only allow GET requests
    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    try {
        // Validate store hash
        if (!storeHash || typeof storeHash !== 'string') {
            return res.status(400).json({ error: 'Store hash is required' });
        }

        // Get configuration
        const config = await db.getConfig(storeHash);
        
        if (!config) {
            return res.status(404).json({ error: 'Configuration not found' });
        }

        // Set cache headers (cache for 5 minutes)
        res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
        
        return res.status(200).json(config);
    } catch (error) {
        console.error('Error fetching config:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
} 