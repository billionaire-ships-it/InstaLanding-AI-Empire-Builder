import * as paypal from '@paypal/checkout-server-sdk';

let clientId = process.env.PAYPAL_CLIENT_ID!;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

let environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
export const client = new paypal.core.PayPalHttpClient(environment);
