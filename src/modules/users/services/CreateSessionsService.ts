import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { IReqCreateSession } from '../domains/models/IReqCreateSession';
import { IResCreateSession } from '../domains/models/IResCreateSession';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IReqCreateSession): Promise<IResCreateSession> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
