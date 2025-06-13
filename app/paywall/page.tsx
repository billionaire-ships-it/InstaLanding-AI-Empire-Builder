"use client";

import React from "react";

export default function Paywall() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Access Locked</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Your 7-day trial has ended. To continue building your empire, please subscribe for just <span className="font-semibold">$100/month</span>. All your data and progress is safely stored and will be restored immediately after payment.
      </p>

      {/* PayPal Subscription Button */}
      <div id="paypal-button-container-P-4KE55680H7129125UNBFIZHY"></div>
      <script
        src="https://www.paypal.com/sdk/js?client-id=AVDLKDMuhceA65HO2xzMXpG33qQLUJsO9FPMxNcBSFVtdO_QNoJFMReEF-9JK2Zdb0nAqLthvm-nrsNm&vault=true&intent=subscription"
        data-sdk-integration-source="button-factory"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            paypal.Buttons({
              style: {
                shape: 'pill',
                color: 'gold',
                layout: 'horizontal',
                label: 'subscribe'
              },
              createSubscription: function(data, actions) {
                return actions.subscription.create({
                  plan_id: 'P-4KE55680H7129125UNBFIZHY'
                });
              },
              onApprove: function(data, actions) {
                fetch("/api/subscribe", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ subscriptionID: data.subscriptionID })
                }).then(() => {
                  window.location.href = "/dashboard";
                });
              }
            }).render('#paypal-button-container-P-4KE55680H7129125UNBFIZHY');
          `,
        }}
      />

      <p className="mt-4 text-sm text-gray-500">You can cancel anytime. Your empire is waiting!</p>
    </div>
  );
}

