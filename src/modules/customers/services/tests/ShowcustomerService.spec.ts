import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import ShowCustomerService from "../ShowCustomerService";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;

describe('ShowCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  })

  it('buscar cliente por id', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
    });

    const customer2 = await showCustomer.execute({id: customer.id});

    expect(customer2).toEqual(customer);
  });

  it('retornar um erro caso não tenha o cliente com id informado', async () => {
    await fakeCustomersRepository.create({
      name: 'Alisson Rhuan',
      email: 'alisson@gmail.com',
    });

    let id = '21564654646';

    expect(
      showCustomer.execute({id: id})
    ).rejects.toBeInstanceOf(AppError);
  })
})
