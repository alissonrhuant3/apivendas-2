import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domains/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
