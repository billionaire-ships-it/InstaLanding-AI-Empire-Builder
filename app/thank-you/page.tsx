// File: app/thank-you/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard?source=optin&utm_campaign=free_pdf&utm_medium=email");
    }, 8000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white max-w-2xl p-10 rounded-3xl shadow-xl border border-orange-300">
        <h1 className="text-4xl font-extrabold text-orange-700 mb-4 leading-tight">
          🎉 Congratulations! Your Journey to a 6-Figure Online Business Starts NOW.
        </h1>
        <p className="text-lg text-gray-800 mb-6">
          You’ve just taken the most important step toward building your empire. But that’s just the beginning.
        </p>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Introducing InstaLanding AI Empire Builder 🚀</h2>
        <p className="text-gray-700 text-base mb-6">
          InstaLanding AI is your all-in-one platform to turn your idea into a thriving online business — FAST. Generate high-converting landing pages, launch powerful ad campaigns, track performance, and scale globally.
        </p>
        <ul className="text-left text-gray-700 space-y-2 mb-6">
          <li>✅ AI-powered copy + page builder</li>
          <li>✅ Instant analytics and performance tracking</li>
          <li>✅ Sabri Suby-style marketing automation</li>
          <li>✅ 1-click launch + business toolkit</li>
          <li>✅ Premium support, tutorials, and a community of empire-builders</li>
        </ul>
        <p className="text-lg font-semibold text-green-700 mb-2">
          Your empire awaits. We're redirecting you to the builder now...
        </p>
        <p className="text-sm text-gray-500">Didn’t get redirected? <a href="/dashboard?source=optin&utm_campaign=free_pdf&utm_medium=email" className="underline text-blue-600">Click here to continue</a>.</p>
      </div>
    </div>
  );
}

