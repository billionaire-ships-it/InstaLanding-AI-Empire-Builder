"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function MarketingAIPage() {
  const [prompt, setPrompt] = useState("");
  const [copy, setCopy] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCopy = async () => {
    setCopy("");
    setLoading(true);

    const res = await fetch("/api/marketing-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) return;

    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      setCopy((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">💡 Marketing AI</h1>
      <p className="text-gray-600">Enter your product or business and let the AI write persuasive ad copy in Sabri Suby style.</p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your product, audience, or campaign goal..."
        className="w-full border p-4 rounded h-32"
      />
      <Button onClick={generateCopy} className="w-full">{loading ? "Generating..." : "Generate Copy"}</Button>
      <div className="bg-gray-50 border p-4 rounded text-sm whitespace-pre-wrap">{copy}</div>
    </div>
  );
}
