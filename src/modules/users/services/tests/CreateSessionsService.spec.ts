import FakeUsersRepository from '@modules/users/domains/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'alisson@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // it('should not be able to create two user with the same email', async () => {
  //   await createUser.execute({
  //     name: 'Alisson Rhuan',
  //     email: 'alisson@gmail.com',
  //     password: '123456',
  //   });

  //   expect(
  //     createUser.execute({
  //       name: 'Alisson Rhuan',
  //       email: 'alisson@gmail.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
