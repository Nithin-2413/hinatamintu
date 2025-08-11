import Mailjet from 'node-mailjet';

if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
  throw new Error("MAILJET_API_KEY and MAILJET_API_SECRET environment variables must be set");
}

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

export interface EmailSubmissionParams {
  name: string;
  recipient_name: string;
  email: string;
  phone: string;
  type_of_message: string;
  message_details: string;
  feelings: string;
  story: string;
  specific_details: string;
  delivery_type: string;
  submission_id: string;
}

export interface EmailReplyParams {
  client_name: string;
  reply_message: string;
  admin_name: string;
  reply_link?: string;
  from_email: string;
  admin_panel_link?: string;
}

export async function sendSubmissionEmail(params: EmailSubmissionParams): Promise<boolean> {
  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.ADMIN_FROM_EMAIL,
            Name: "The Written Hug"
          },
          To: [
            {
              Email: "onaamikaonaamika@gmail.com",
              Name: "Admin"
            }
          ],
          Bcc: [
            {
              Email: "bintemp8@gmail.com",
              Name: "BCC Admin"
            }
          ],
          TemplateID: parseInt(process.env.MAILJET_TEMPLATE_ID_SUBMISSION || '7221431'),
          TemplateLanguage: true,
          Subject: `You've Got a Kabootar from ${params.name}`,
          Variables: {
            name: params.name,
            recipient_name: params.recipient_name,
            date: new Date().toISOString(),
            status: "New",
            email: params.email,
            phone: params.phone,
            type_of_message: params.type_of_message,
            message_details: params.message_details,
            feelings: params.feelings,
            story: params.story,
            specific_details: params.specific_details,
            delivery_type: params.delivery_type,
            submission_id: params.submission_id
          }
        }
      ]
    });
    return true;
  } catch (error) {
    console.error('Mailjet submission email error:', error);
    return false;
  }
}

export async function sendReplyEmail(clientEmail: string, params: EmailReplyParams): Promise<boolean> {
  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.ADMIN_FROM_EMAIL,
            Name: "CEO-The Written Hug"
          },
          To: [
            {
              Email: clientEmail,
              Name: params.client_name
            }
          ],
          TemplateID: parseInt(process.env.MAILJET_TEMPLATE_ID_REPLY || '7221146'),
          TemplateLanguage: true,
          Subject: "You've Got a Kabootar from CEO-The Written Hug",
          Variables: {
            client_name: params.client_name,
            reply_message: params.reply_message,
            admin_name: "CEO-The Written Hug",
            reply_link: params.reply_link || '',
            from_email: params.from_email,
            admin_panel_link: params.admin_panel_link || ''
          }
        }
      ]
    });
    return true;
  } catch (error) {
    console.error('Mailjet reply email error:', error);
    return false;
  }
}