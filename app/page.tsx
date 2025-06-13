// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <h1 className="text-5xl font-bold text-empire mb-6">
        Build Your Online Empire with AI
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        InstaLanding AI helps you launch a profitable business with 1 click — complete with landing pages, payments, analytics, and marketing systems. No tech skills required.
      </p>
      <Link href="/register">
        <button className="bg-brand text-white px-6 py-3 rounded-2xl shadow-xl hover:bg-indigo-700 transition">
          Get Started Now
        </button>
      </Link>
    </div>
  );
}
