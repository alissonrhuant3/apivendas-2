import path from 'path';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domains/repositories/IUserTokensRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IReqSendForgotPass): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[API VENDAS] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
          },
        },
      });
      return;
    }

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
