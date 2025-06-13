import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  const { to } = await req.json();

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject: 'Welcome to InstaLanding AI',
      html: '<strong>Your business empire begins today.</strong>'
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 });
  }
}
