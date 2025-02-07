import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../lib/auth';

const READABLE_SCRIPT_CONFIG = {
    name: "Readable",
    description: "Readable script for BigCommerce",
    src: "https://js.certifiedcode.io/bigcommerce-readable/app.js",
    auto_uninstall: true,
    load_method: "default",
    location: "head",
    visibility: "storefront",
    kind: "src",
    consent_category: "essential"
};

export default async function scripts(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash);

        switch (method) {
            case 'GET':
                const { data: scripts } = await bigcommerce.get('/content/scripts');
                res.status(200).json(scripts);
                break;

            case 'PUT':
                const { scriptId, enabled } = req.body;
                
                if (scriptId) {
                    // Update existing script
                    const { data: updatedScript } = await bigcommerce.put(`/content/scripts/${scriptId}`, {
                        ...READABLE_SCRIPT_CONFIG,
                        enabled
                    });
                    res.status(200).json(updatedScript);
                } else if (enabled) {
                    // Create new script if enabled is true and no scriptId provided
                    const { data: newScript } = await bigcommerce.post('/content/scripts', {
                        ...READABLE_SCRIPT_CONFIG,
                        enabled: true
                    });
                    res.status(201).json(newScript);
                } else {
                    res.status(200).json({ enabled: false });
                }
                break;

            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('API Error:', error);
        const { message, response } = error;
        res.status(response?.status || 500).json({ message: message || 'An error occurred' });
    }
} 