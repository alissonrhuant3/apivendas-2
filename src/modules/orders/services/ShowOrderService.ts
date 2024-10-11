import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { inject, injectable } from 'tsyringe';
import { IShowOrder } from '../domains/models/IShowOrder';
import { IOrdersRepository } from '../domains/repositories/IOrdersRepository';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
