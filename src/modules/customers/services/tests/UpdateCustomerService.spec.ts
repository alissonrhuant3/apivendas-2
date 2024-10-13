import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from '../CreateCustomerService';
import UpdateCustomerService from '../UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let updateCustomer: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
  });

  it('atualizacao de um cliente', async () => {
    const customer = await createCustomer.execute({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
    });

    const updatedCustomer = await updateCustomer.execute({
      id: customer.id,
      name: 'Augusto Kauan',
      email: 'augusto@gmail.com',
    });

    expect(updatedCustomer.name).toBe('Augusto Kauan');
  });

  it('cliente nao existe', async () => {
    let id = '5156165165156';

    const customer = await createCustomer.execute({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
    });

    expect(
      updateCustomer.execute({
      id: id,
      name: 'Augusto Kauan',
      email: 'augusto@gmail.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
  })

  it('email existe e nao e do cliente', async () => {
    await createCustomer.execute({
      name: 'Augusto Kauan',
      email: 'augusto@gmail.com',
    });

    const customer = await createCustomer.execute({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
    });

    expect(
      updateCustomer.execute({
      id: customer.id,
      name: 'Alisson Rhuan',
      email: 'augusto@gmail.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
  })
});
