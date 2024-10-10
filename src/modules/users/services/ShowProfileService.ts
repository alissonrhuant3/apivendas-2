import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { IReqShowProfile } from '../domains/models/IReqShowProfile';
import { injectable } from 'tsyringe';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ user_id }: IReqShowProfile): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
