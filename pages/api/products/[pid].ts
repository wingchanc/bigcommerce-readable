import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function scripts(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        query: { pid },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const bigcommerce = bigcommerceClient(accessToken, storeHash);

                const { data } = await bigcommerce.get('/content/scripts');
                res.status(200).json(data);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        case 'PUT':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const bigcommerce = bigcommerceClient(accessToken, storeHash);

                const { data } = await bigcommerce.put(`/content/scripts/${pid}`, {
                    ...body,
                    enabled: body.enabled ?? true,
                    auto_uninstall: true,
                    load_method: "default",
                    location: "head",
                    visibility: "storefront",
                    kind: "src",
                    consent_category: "essential"
                });
                res.status(200).json(data);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        case 'DELETE':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const bigcommerce = bigcommerceClient(accessToken, storeHash);

                await bigcommerce.delete(`/content/scripts/${pid}`);
                res.status(204).end();
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
