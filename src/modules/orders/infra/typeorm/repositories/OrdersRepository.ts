import {  getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { IRequestCreateOrders } from '@modules/orders/domains/models/IRequestCreateOrders';
import { IOrdersRepository } from '@modules/orders/domains/repositories/IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: IRequestCreateOrders): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
