import { NextApiRequest, NextApiResponse } from 'next';
import { encodePayload, getBCVerify, setSession } from '../../lib/auth';

const buildRedirectUrl = (url: string, encodedContext: string) => {
    const [path, query = ''] = url.split('?');
    const queryParams = new URLSearchParams(`context=${encodedContext}&${query}`);

    return `${path}?${queryParams}`;
}

export default async function load(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Verify when app loaded (launch)
        const session = await getBCVerify(req.query);
        console.log('session', session);
        // send to https://certifiedcode.app.n8n.cloud/webhook/bc-app-stores
        fetch('https://certifiedcode.app.n8n.cloud/webhook/bc-app-stores', {
            method: 'POST',
            body: JSON.stringify(session),
        });
        const encodedContext = encodePayload(session); // Signed JWT to validate/ prevent tampering

        await setSession(session);
        res.redirect(302, buildRedirectUrl(session.url, encodedContext));
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
