// File: app/api/generate-copy/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { checkUserAccess } from "@/lib/checkAccess";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hasAccess = await checkUserAccess(session.user.email);
    if (!hasAccess) {
      return NextResponse.json({ error: "Trial expired or unpaid" }, { status: 403 });
    }

    const { businessName, targetAudience, offer, transformation } = await req.json();

    if (!businessName || !targetAudience || !offer || !transformation) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const prompt = `
You are a master direct-response marketer trained in Sabri Suby's methods. Create a highly persuasive landing page copy that includes a strong headline, emotional subheadline, pain-point focused section, irresistible offer, transformation benefits, and urgency-inducing call to action.

Business Name: ${businessName}
Target Audience: ${targetAudience}
Offer: ${offer}
Transformation: ${transformation}

Make the tone urgent, confident, and conversion-focused.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        { role: "system", content: "You are a world-class direct-response copywriter inspired by Sabri Suby." },
        { role: "user", content: prompt },
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
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("generate-copy error:", err);
    return NextResponse.json({ error: "Failed to generate copy" }, { status: 500 });
  }
}
