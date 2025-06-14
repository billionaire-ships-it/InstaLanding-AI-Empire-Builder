// File: app/api/ai/generate-page/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth"; // fallback import
import { checkUserAccess } from "@/lib/checkAccess";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const systemPrompt = `
You are an expert front-end developer specialized in creating clean, modern, responsive landing pages using Tailwind CSS. 
Generate a full HTML landing page with:

- Semantic, accessible HTML5 structure
- Tailwind CSS utility classes for styling and responsiveness
- Sections including: header with navigation, hero with heading and call-to-action button, features section with icons, pricing or benefits section, and footer with social links
- Mobile-friendly and SEO-optimized
- Include comments for clarity
- Do NOT include any scripts, only pure HTML and Tailwind CSS classes

The user will provide a description of their product or service. Use that description creatively to build the page content.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const html = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ html });
  } catch (error) {
    console.error("Page generation error:", error);
    return NextResponse.json({ error: "Failed to generate page" }, { status: 500 });
  }
}
