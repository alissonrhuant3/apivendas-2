import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { IReqCreateUser } from '../domains/models/IReqCreateUser';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IReqCreateUser): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email addres already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
