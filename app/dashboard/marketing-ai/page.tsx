"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarketingAIPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult("");
    setLoading(true);

    const res = await fetch("/api/marketing-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return;

    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value);
      setResult((prev) => prev + chunk);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">⚡ InstaLanding Marketing AI</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-3 text-sm"
          rows={4}
          placeholder="Enter your product details, campaign goals, or target audience..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Generating..." : "Generate Copy"}
        </button>
      </form>

      <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap min-h-[200px]">
        {result || "Your high-converting ad copy will appear here..."}
      </div>
    </div>
  );
}


