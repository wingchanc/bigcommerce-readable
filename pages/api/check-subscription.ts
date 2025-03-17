import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/auth';
import { handleApiError } from '../../lib/api-helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Starting check-subscription handler');
  
  if (req.method !== 'GET') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Getting session...');
    const session = await getSession(req);
    console.log('Session retrieved:', { 
      hasAccessToken: !!session?.accessToken,
      storeHash: session?.storeHash 
    });

    if (!session?.accessToken) {
      console.log('No access token found in session');
      return res.status(401).json({ error: 'Unauthorized', redirectTo: '/session-expired' });
    }

    const accountId = process.env.ACCOUNT_UUID;
    const accessToken = process.env.SUBSCRIPTION_ACCESS_TOKEN;
    const { storeHash } = session;

    if (!accountId || !accessToken) {
      console.error('Missing required environment variables:', {
        hasAccountId: !!accountId,
        hasAccessToken: !!accessToken
      });
      return res.status(500).json({ error: 'Missing required configuration' });
    }

    console.log('Configuration:', { 
      hasAccountId: !!accountId,
      hasAccessToken: !!accessToken,
      storeHash
    });

    const payload = {
      query: `
        query {
          account {
            subscriptions {
              edges {
                node {
                  id
                  status
                  product {
                    id
                    type
                    productLevel
                  }
                  scope {
                    type
                    id
                  }
                }
              }
            }
          }
        }
      `
    };

    console.log('Preparing request with payload:', {
      url: `https://api.bigcommerce.com/accounts/${accountId}/graphql`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '[REDACTED]',
        'X-Auth-Token': '[REDACTED]'
      },
      query: payload.query
    });

    const requestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Auth-Token': accessToken
      },
      body: JSON.stringify(payload)
    };

    console.log('Sending request to BigCommerce API...');
    const response = await fetch(`https://api.bigcommerce.com/accounts/${accountId}/graphql`, requestConfig);
    
    // Log raw response for debugging
    const rawResponseText = await response.text();
    console.log('Raw response:', rawResponseText);
    
    let data;
    try {
      data = JSON.parse(rawResponseText);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      return res.status(500).json({ error: 'Invalid response from API' });
    }

    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    console.log('Response data:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      const errorMessage = data.errors[0]?.message || 'Unknown GraphQL error';
      const errorDetails = {
        message: errorMessage,
        path: data.errors[0]?.path,
        locations: data.errors[0]?.locations
      };
      return res.status(400).json({ error: errorMessage, details: errorDetails });
    }

    // Filter subscriptions for the current store if data exists
    if (data.data?.account?.subscriptions?.edges) {
      const filteredSubscriptions = data.data.account.subscriptions.edges.filter((edge: any) => {
        const subscription = edge.node;
        return subscription.scope?.id === `bc/account/scope/${storeHash}` &&
               subscription.product?.id === 'bc/account/product/57770';
      });
      
      data.data.account.subscriptions.edges = filteredSubscriptions;
    }

    console.log('Successfully processed subscription check');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in check-subscription:', error);
    return handleApiError(error, res);
  }
} 