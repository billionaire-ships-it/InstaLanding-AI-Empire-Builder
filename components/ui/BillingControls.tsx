"use client";

import { useState } from "react";

export default function BillingControls() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    setLoading(true);
    const res = await fetch("/api/cancel-subscription", { method: "POST" });
    const data = await res.json();
    setMessage(data.message || "Request sent.");
    setLoading(false);
  };

  const handleRefund = async () => {
    setLoading(true);
    const res = await fetch("/api/request-refund", { method: "POST" });
    const data = await res.json();
    setMessage(data.message || "Refund request sent.");
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow max-w-md mx-auto mt-8 text-center">
      <h2 className="text-xl font-bold mb-2">Manage Your Subscription</h2>
      <p className="mb-4 text-sm text-gray-600">You can cancel anytime or request a refund within your trial.</p>

      <div className="space-y-3">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Cancel Subscription
        </button>

        <button
          onClick={handleRefund}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
        >
          Request Refund
        </button>
      </div>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
