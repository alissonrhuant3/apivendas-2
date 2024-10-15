import FakeUsersRepository from '@modules/users/domains/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two user with the same email', async () => {
    await createUser.execute({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Alisson Rhuan',
        email: 'alisson@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
