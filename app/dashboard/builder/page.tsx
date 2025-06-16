"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function BuilderPage() {
  const [businessName, setBusinessName] = useState("");
  const [audience, setAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [transformation, setTransformation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName, targetAudience: audience, offer, transformation }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      setResult((prev) => prev + decoder.decode(value));
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">⚡ Build a High-Converting Landing Page</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Business Name" value={businessName} onChange={e => setBusinessName(e.target.value)} />
          <input className="w-full border p-3 rounded" placeholder="Target Audience" value={audience} onChange={e => setAudience(e.target.value)} />
          <input className="w-full border p-3 rounded" placeholder="Offer" value={offer} onChange={e => setOffer(e.target.value)} />
          <input className="w-full border p-3 rounded" placeholder="Transformation (Before → After)" value={transformation} onChange={e => setTransformation(e.target.value)} />
          <Button onClick={handleGenerate} className="w-full">Generate Landing Page Copy</Button>
          {loading && <LoadingSpinner className="mt-4" />}
        </div>

        <textarea value={result} onChange={(e) => setResult(e.target.value)} className="w-full h-96 p-4 border rounded bg-gray-50 text-sm" />
      </div>
    </div>
  );
}
