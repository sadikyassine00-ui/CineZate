import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { organisation, contact, email, phone, tier, goals } = data;

    if (!organisation || !email) {
      return NextResponse.json({ error: 'Organisation and Email are required fields.' }, { status: 400 });
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'CineZate Sponsorship <website@cinezate.com>', // MUST be verified in Resend dashboard
      to: ['contact@cinezate.com'],
      replyTo: email,
      subject: `New Sponsorship Request from ${organisation}`,
      html: `
        <h2>New Sponsorship Request</h2>
        <p><strong>Organisation:</strong> ${organisation}</p>
        <p><strong>Contact Person:</strong> ${contact || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Requested Tier:</strong> ${tier || 'N/A'}</p>
        <p><strong>Goals & Objectives:</strong><br/> ${goals ? goals.replace(/\n/g, '<br/>') : 'N/A'}</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: error.message || 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error: any) {
    console.error('API catch error:', error);
    return NextResponse.json({ error: error.message || 'Erreur interne du serveur' }, { status: 500 });
  }
}
