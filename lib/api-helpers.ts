import { NextApiResponse } from 'next';

export function handleApiError(error: any, res: NextApiResponse) {
    console.error('API Error:', error);

    if (error.message === 'jwt expired') {
        return res.status(401).json({
            error: 'Session expired',
            redirectTo: '/session-expired'
        });
    }

    if (error.message?.includes('User is not available')) {
        return res.status(401).json({
            error: 'Unauthorized',
            redirectTo: '/session-expired'
        });
    }

    return res.status(500).json({
        error: 'An unexpected error occurred'
    });
} 