import * as paypal from "@paypal/checkout-server-sdk";

const env = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);
const client = new paypal.core.PayPalHttpClient(env);

export default client;
