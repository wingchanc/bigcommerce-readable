import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/auth';
import { handleApiError } from '../../lib/api-helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession(req);
    console.log('Session:', session);
    if (!session?.accessToken) {
      return res.status(401).json({ error: 'Unauthorized', redirectTo: '/session-expired' });
    }

    const accountId = process.env.ACCOUNT_UUID;
    const accessToken = process.env.SUBSCRIPTION_ACCESS_TOKEN;
    const { storeHash } = session;

    const payload = {
      query: `
        mutation ($checkout: CreateCheckoutInput!) {
          checkout {
            createCheckout(input: $checkout) {
              checkout {
                id
                accountId
                status
                checkoutUrl
                items(first: 1) {
                  edges {
                    node {
                      subscriptionId
                      status
                      product {
                        id
                        type
                        productLevel
                      }
                      scope {
                        id
                        type
                      }
                      pricingPlan {
                        interval
                        price {
                          value
                          currencyCode
                        }
                        trialDays
                      }
                      redirectUrl
                      description
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        checkout: {
          accountId: `bc/account/account/${accountId}`,
          items: [
            {
              product: {
                id: "bc/account/product/57770",
                type: "APPLICATION",
                productLevel: "Plus"
              },
              scope: {
                id: `bc/account/scope/${storeHash}`,
                type: "STORE"
              },
              pricingPlan: {
                interval: "MONTH",
                price: {
                  value: 19.99,
                  currencyCode: "USD"
                },
                trialDays: 0
              },
              description: "App Subscription - Plus",
              redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade-success`
            }
          ]
        }
      }
    };

    // if in local host, set amount to 0
    if (process.env.NODE_ENV === 'development') {
      payload.variables.checkout.items[0].pricingPlan.price.value = 0;
    }

    // Debug request
    const requestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Auth-Token': accessToken
      },
      body: JSON.stringify(payload)
    };

    console.log('Request config:', {
      url: `https://api.bigcommerce.com/accounts/${accountId}/graphql`,
      method: requestConfig.method,
      headers: {
        ...requestConfig.headers,
        'Authorization': '[REDACTED]',
        'X-Auth-Token': '[REDACTED]'
      },
      payload: JSON.stringify(payload, null, 2)
    });

    const response = await fetch(`https://api.bigcommerce.com/accounts/${accountId}/graphql`, requestConfig);
    const data = await response.json();

    // Debug response
    console.log('Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: JSON.stringify(data, null, 2)
    });
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return res.status(200).json(data);
  } catch (error) {
    return handleApiError(error, res);
  }
} 