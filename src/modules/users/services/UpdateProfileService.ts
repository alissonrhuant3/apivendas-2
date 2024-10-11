import { compare, hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IReqUpdateProfile): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    //Verificação se existe o email no banco de dados, e se o email não pertence ao próprio usuário
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
