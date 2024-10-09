import { Request, Response } from 'express';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import CustomersRepository from '../../typeorm/repositories/CustomersRepository';
import { container } from 'tsyringe';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomerService);

    const costumers = await listCustomers.execute();

    return response.json(costumers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCostumer = container.resolve(ShowCustomerService);

    const costumer = await showCostumer.execute({ id });

    return response.json(costumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCostumer = container.resolve(CreateCustomerService);

    const customer = await createCostumer.execute({
      name,
      email
    });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const costumer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.status(200).json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.status(204).json([]);
  }
}
