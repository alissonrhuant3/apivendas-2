import Order from "@modules/orders/infra/typeorm/entities/Order";
import { IRequestCreateOrders } from "../models/IRequestCreateOrders";

export interface IOrdersRepository {
  findById(id: string): Promise<Order | undefined>;
  createOrder({ customer, products }: IRequestCreateOrders): Promise<Order>;
}
