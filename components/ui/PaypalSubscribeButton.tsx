"use client";

import { useEffect } from "react";

const PayPalSubscribeButton = () => {
  useEffect(() => {
    // Load PayPal script
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AVDLKDMuhceA65HO2xzMXpG33qQLUJsO9FPMxNcBSFVtdO_QNoJFMReEF-9JK2Zdb0nAqLthvm-nrsNm&vault=true&intent=subscription";
    script.setAttribute("data-sdk-integration-source", "button-factory");
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.paypal) {
        // @ts-ignore
        window.paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'gold',
            layout: 'horizontal',
            label: 'subscribe'
          },
          createSubscription: function (data: any, actions: any) {
            return actions.subscription.create({
              plan_id: 'P-4KE55680H7129125UNBFIZHY'
            });
          },
          onApprove: function (data: any) {
            fetch("/api/paypal/success", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                subscriptionId: data.subscriptionID
              })
            }).then(() => {
              alert("🎉 Subscription successful! You now have full access.");
              window.location.href = "/dashboard";
            });
          }
        }).render("#paypal-button-container");
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center items-center mt-6">
      <div id="paypal-button-container" />
    </div>
  );
};

export default PayPalSubscribeButton;

