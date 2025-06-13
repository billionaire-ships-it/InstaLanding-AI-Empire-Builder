// File: app/api/generate-copy/route.ts

import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a world-class marketer and copywriter. Generate high-converting marketing copy such as Facebook ads, email subject lines, or product descriptions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response as any) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
