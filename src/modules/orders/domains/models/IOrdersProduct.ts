import Order from "@modules/orders/infra/typeorm/entities/Order";
import Product from "@modules/products/infra/typeorm/entities/Product";

export interface IOrdersProduct {
  id: string;
  order: Order;
  product: Product;
  product_id: string;
  order_id: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
