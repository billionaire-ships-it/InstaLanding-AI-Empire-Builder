// app/api/ai/generate-page/route.ts
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const hasAccess = await checkUserAccess(session.user.id);

  if (!hasAccess) {
    return new Response("Trial expired or unpaid", { status: 403 });
  }


import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Detailed system prompt for high-quality landing page generation
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
      model: "gpt-4o-mini",
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
    return NextResponse.json(
      { error: "Failed to generate page" },
      { status: 500 }
    );
  }
}}
