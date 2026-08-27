import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      organisation, 
      company, 
      institution,
      contact, 
      fullName, 
      name, 
      email, 
      phone, 
      tier, 
      formula, 
      jobTitle, 
      role, 
      goals, 
      message, 
      remarks,
      type = 'general'
    } = data;

    const applicantName = fullName || contact || name || 'N/A';
    const applicantOrg = organisation || company || institution || 'N/A';
    const applicantEmail = email ? email.trim() : '';
    const applicantPhone = phone || 'N/A';
    const applicantJob = jobTitle || role || 'N/A';
    const selectedFormula = tier || formula || 'N/A';
    const notes = message || goals || remarks || '';

    if (!applicantEmail) {
      return NextResponse.json({ error: 'L\'adresse email est requise.' }, { status: 400 });
    }

    // Determine type label & subject
    let typeLabel = 'Demande de Contact';
    if (type === 'badge') typeLabel = 'Demande de Badge / Accréditation';
    else if (type === 'sponsor') typeLabel = 'Demande de Sponsoring & Partenariat';
    else if (type === 'stand') typeLabel = 'Demande d\'Espace Exposant (Stand)';

    const requestSubject = `[FICIAI 2026] ${typeLabel} — ${applicantName} (${applicantOrg})`;

    // 1. Send Notification Email to Event Organizers (contact@cinezate.com)
    const { data: emailData, error } = await resend.emails.send({
      from: 'FICIAI 2026 <website@cinezate.com>',
      to: ['contact@cinezate.com'],
      replyTo: applicantEmail,
      subject: requestSubject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F5F3; margin: 0; padding: 24px; color: #111827; }
            .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #B8432F; padding: 24px; color: #FFFFFF; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 28px 24px; }
            .badge-type { display: inline-block; background: #FEF2F2; color: #B8432F; border: 1px solid #FECACA; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 18px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .table td { padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-size: 13.5px; }
            .label { color: #6B7280; font-weight: 600; width: 150px; }
            .val { color: #111827; font-weight: 500; }
            .message-box { background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.5; color: #374151; }
            .footer { background: #FAFAF9; padding: 16px 24px; font-size: 11px; color: #9CA3AF; text-align: center; border-top: 1px solid #E5E7EB; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>${typeLabel}</h1>
              <p>Festival International du Cinéma & de l'IA (FICIAI 2026) • Ouarzazate</p>
            </div>
            
            <div class="content">
              <span class="badge-type">${selectedFormula}</span>
              
              <table class="table">
                <tr>
                  <td class="label">Organisation :</td>
                  <td class="val"><strong>${applicantOrg}</strong></td>
                </tr>
                <tr>
                  <td class="label">Fonction / Rôle :</td>
                  <td class="val">${applicantJob}</td>
                </tr>
                <tr>
                  <td class="label">Nom & Prénom :</td>
                  <td class="val">${applicantName}</td>
                </tr>
                <tr>
                  <td class="label">Email :</td>
                  <td class="val"><a href="mailto:${applicantEmail}" style="color: #B8432F; text-decoration: none; font-weight: 600;">${applicantEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Téléphone :</td>
                  <td class="val">${applicantPhone}</td>
                </tr>
                <tr>
                  <td class="label">Formule / Pack :</td>
                  <td class="val" style="color: #B8432F; font-weight: 700;">${selectedFormula}</td>
                </tr>
              </table>

              <div>
                <strong style="display: block; margin-bottom: 6px; font-size: 13px; color: #374151;">Message / Remarques complémentaires :</strong>
                <div class="message-box">
                  ${notes ? notes.replace(/\n/g, '<br/>') : '<em>Aucune remarque spécifiée.</em>'}
                </div>
              </div>
            </div>
            
            <div class="footer">
              Cet email a été envoyé automatiquement depuis la plateforme officielle cinezate.com
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: error.message || 'Erreur lors de l\'envoi de l\'email via Resend.' }, { status: 500 });
    }

    // 2. Also send an automated acknowledgment confirmation email to the applicant!
    try {
      await resend.emails.send({
        from: 'FICIAI 2026 <website@cinezate.com>',
        to: [applicantEmail],
        subject: `Confirmation de votre demande : ${typeLabel} — FICIAI 2026`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F5F3; margin: 0; padding: 24px; color: #111827; }
              .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              .header { background: #B8432F; padding: 24px; color: #FFFFFF; text-align: center; }
              .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
              .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
              .content { padding: 28px 24px; font-size: 13.5px; line-height: 1.6; color: #374151; }
              .summary { background: #FAFAF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; }
              .footer { background: #FAFAF9; padding: 16px 24px; font-size: 11px; color: #9CA3AF; text-align: center; border-top: 1px solid #E5E7EB; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h1>FICIAI 2026</h1>
                <p>Festival International du Cinéma & de l'IA • Ouarzazate, Maroc</p>
              </div>
              
              <div class="content">
                <p>Bonjour <strong>${applicantName}</strong>,</p>
                <p>Nous avons bien reçu votre <strong>${typeLabel}</strong> pour l'événement <strong>FICIAI 2026</strong> qui se tiendra à Ouarzazate du 6 au 8 novembre 2026.</p>
                
                <div class="summary">
                  <p style="margin: 0 0 8px;"><strong>Récapitulatif de votre enregistrement :</strong></p>
                  <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>Organisation :</strong> ${applicantOrg}</li>
                    <li><strong>Fonction :</strong> ${applicantJob}</li>
                    <li><strong>Formule / Pack :</strong> ${selectedFormula}</li>
                  </ul>
                </div>

                <p>Notre équipe d'organisation examine votre demande et vous contactera dans les plus brefs délais avec tous les détails logistiques et les modalités d'accès.</p>
                <p>Pour toute question urgente, n'hésitez pas à répondre directement à cet email ou à nous contacter à <a href="mailto:contact@cinezate.com" style="color: #B8432F; font-weight: 600;">contact@cinezate.com</a>.</p>
                
                <p style="margin-top: 24px; color: #111827;">
                  Bien cordialement,<br/>
                  <strong>Le Comité d'Organisation FICIAI 2026</strong><br/>
                  <span style="color: #6B7280; font-size: 12px;">CineZate Studios • Ouarzazate, Maroc</span>
                </p>
              </div>
              
              <div class="footer">
                FICIAI 2026 • Ouarzazate, Maroc • <a href="https://cinezate.com" style="color: #6B7280;">cinezate.com</a>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (confError) {
      console.warn('Could not send confirmation to applicant:', confError);
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error: any) {
    console.error('API catch error:', error);
    return NextResponse.json({ error: error.message || 'Erreur interne du serveur' }, { status: 500 });
  }
}
