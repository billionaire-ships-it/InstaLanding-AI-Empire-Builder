"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function PageBuilder() {
  const [headline, setHeadline] = useState("Your irresistible headline here");
  const [subheadline, setSubheadline] = useState("Make them want more with your hook");
  const [loading, setLoading] = useState(false);

  async function generateCopy() {
    setLoading(true);

    const response = await fetch("/api/generate-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Generate a persuasive headline and subheadline for a landing page." }),
    });

    if (!response.ok) {
      alert("Error generating copy.");
      setLoading(false);
      return;
    }

    const { headline: newHeadline, subheadline: newSubheadline } = await response.json();
    setHeadline(newHeadline || headline);
    setSubheadline(newSubheadline || subheadline);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">AI Page Builder</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          title="Edit Sections"
          content={
            <>
              <label className="block font-semibold mb-1">Headline</label>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />

              <label className="block font-semibold mb-1">Subheadline</label>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows={2}
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
              />

              <Button onClick={generateCopy} disabled={loading} className="w-full">
                {loading ? "Generating..." : "Generate AI Copy"}
              </Button>
            </>
          }
        />

        <Card
          title="Live Preview"
          content={
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{headline}</h2>
              <p className="text-lg italic text-gray-600">{subheadline}</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
