// File: app/api/generate-copy/route.ts
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const hasAccess = await checkUserAccess(session.user.id);

  if (!hasAccess) {
    return new Response("Trial expired or unpaid", { status: 403 });
  }


import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

export async function POST(req: Request) {
  const { businessName, targetAudience, offer, transformation } = await req.json();

  if (!businessName || !targetAudience || !offer || !transformation) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const prompt = `
Write high-converting landing page copy using Sabri Suby style.
Business Name: ${businessName}
Target Audience: ${targetAudience}
Offer: ${offer}
Transformation: ${transformation}
Include: Headline, Subheadline, Pain Points, Offer, Benefits, CTA.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      { role: 'system', content: 'You are a top-tier copywriter' },
      { role: 'user', content: prompt },
    ],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
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
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}}


