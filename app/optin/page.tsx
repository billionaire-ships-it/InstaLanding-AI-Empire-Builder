"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OptInPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("optinEmail", email);


    await fetch("/api/optin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSubmitted(true);
    setTimeout(() => router.push("/thank-you"), 3000);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-6">
      {!submitted ? (
        <div className="bg-white max-w-2xl p-10 rounded-3xl shadow-xl text-center border border-orange-300">
          <h1 className="text-4xl font-extrabold mb-4 text-orange-700 leading-tight">
            🚀 Free Blueprint Reveals: <br />How to Launch a 6-Figure Online Business in Just 7 Days!
          </h1>
          <p className="mb-6 text-gray-800 text-lg">
            Sabri Suby-style marketing strategies condensed into one powerhouse PDF. Discover how to uncover burning problems, create irresistible offers, and dominate with your landing page.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="🔥 Enter your best email to get the PDF now!"
              className="p-4 rounded-xl border border-gray-400 text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-600 text-white font-bold py-3 text-lg rounded-xl hover:bg-orange-700 transition"
            >
              🎯 Yes, Send Me the Blueprint!
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-500">No spam. Just pure gold.</p>
        </div>
      ) : (
        <div className="bg-white max-w-md p-8 rounded-3xl shadow-xl text-center border border-green-300">
          <h2 className="text-3xl font-bold mb-4 text-green-700">✅ You’re In!</h2>
          <p className="mb-4 text-gray-700 text-lg">
            Your blueprint is on the way! Check your email or <a
              className="underline text-green-600 font-semibold"
              href="/downloads/6-figure-launch.pdf" download>
              click here to download it instantly.
            </a>
          </p>
          <p className="text-sm text-gray-500">Redirecting to your AI Empire Builder...</p>
        </div>
      )}
    </div>
  );
}
