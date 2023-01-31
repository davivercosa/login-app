import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import { IApiResponse } from '../interfaces/shared/responses';
import forgotPassordTemplate from './html/forgotPasswordTemplate';

dotenv.config();

export default async function mail(
  email: string,
  token: string,
): Promise<IApiResponse> {
  try {
    const link = `${process.env
      .FRONT_END_LINK!}/change-password&token=${token}`;

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const html = forgotPassordTemplate(link);

    await transporter.sendMail({
      from: '"Davi Verçosa 🦩" <loginapp@davivercosa.com>',
      to: email,
      subject: 'Login App ✅',
      text: 'Recover Password 🔐',
      html,
    });

    return {
      status: 'success',
      message:
        'You should receive an e-mail shortly, allowing you to change your password. Make sure to check the spam or the trash, in case you were not able to find it in your main e-mail box',
    };
  } catch (error) {
    const err = error as Error;

    console.log(err);

    return {
      status: 'error',
      message: err,
      code: 500,
    };
  }
}
