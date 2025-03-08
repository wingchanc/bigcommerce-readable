import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession(req);
    if (!session?.accessToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accountId = process.env.ACCOUNT_UUID;
    const accessToken = process.env.SUBSCRIPTION_ACCESS_TOKEN;

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
                productLevel: "Basic"
              },
              scope: {
                id: `bc/account/scope/${accountId}`,
                type: "STORE"
              },
              pricingPlan: {
                interval: "MONTH",
                price: {
                  value: 30.00,
                  currencyCode: "USD"
                },
                trialDays: 0
              },
              description: "App Subscription - Basic",
              redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade_success?context=${req.query.context}`
            }
          ]
        }
      }
    };

    console.log('Request payload:', JSON.stringify(payload, null, 2));
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'X-Auth-Token': accessToken
    });

    const response = await fetch(`https://api.bigcommerce.com/accounts/${accountId}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Auth-Token': accessToken
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Upgrade error:', error);
    return res.status(500).json({ error: 'Failed to process upgrade request' });
  }
} 