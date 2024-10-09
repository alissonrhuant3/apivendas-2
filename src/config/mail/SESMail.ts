import nodemailer from 'nodemailer';
import aws, { SendEmailCommand, SendRawEmailCommand, SESClient } from '@aws-sdk/client-ses';
import handlebarsMailTemplate from './HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import AppError from '@shared/errors/AppError';
import { PassThrough } from 'stream';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new handlebarsMailTemplate();

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new AppError(
        'AWS credentials are not defined. Please check your environment variables.',
      );
    }

    const ses = new SESClient({
      region: 'eu-north-1',
      credentials: {
        accessKeyId,
        secretAccessKey,
      }
    });

    const transporter = nodemailer.createTransport({
      SES: {
          ses: ses,
          aws: { SendRawEmailCommand }
        }
    });

    const { email, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
