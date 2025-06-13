"use client";

import { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [offer, setOffer] = useState("");
  const [transformation, setTransformation] = useState("");
  const [generatedCopy, setGeneratedCopy] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateCopy() {
    setLoading(true);
    setGeneratedCopy("");
    setStreamingText("");

    const res = await fetch("/api/generate-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName, targetAudience, offer, transformation }),
    });

    if (!res.ok) {
      setLoading(false);
      alert("Failed to generate copy.");
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return;

    let done = false;
    let accumulatedText = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value);
      accumulatedText += chunk;
      setStreamingText(accumulatedText);
    }

    setGeneratedCopy(accumulatedText);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Build Your High-Converting Landing Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Enter Business Details</h2>

          <input
            type="text"
            placeholder="Business Name"
            className="w-full p-2 border rounded mb-2"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Target Audience"
            className="w-full p-2 border rounded mb-2"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
          <input
            type="text"
            placeholder="Offer"
            className="w-full p-2 border rounded mb-2"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transformation"
            className="w-full p-2 border rounded mb-4"
            value={transformation}
            onChange={(e) => setTransformation(e.target.value)}
          />

          <Button onClick={generateCopy} className="w-full">Generate Copy</Button>

          {loading && <LoadingSpinner className="mt-6" />}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Generated Landing Page Copy</h2>
          {loading ? (
            <p className="text-gray-500 italic">Writing copy...</p>
          ) : streamingText ? (
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded text-sm text-gray-800 animate-pulse">
              {streamingText}
            </pre>
          ) : (
            <p className="text-gray-400">Your AI-powered copy will appear here.</p>
          )}
        </Card>
      </div>
    </div>
  );
}

