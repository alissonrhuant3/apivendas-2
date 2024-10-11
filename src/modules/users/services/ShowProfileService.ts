import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { IReqShowProfile } from '../domains/models/IReqShowProfile';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ user_id }: IReqShowProfile): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
