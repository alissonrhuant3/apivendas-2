import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '@modules/orders/domains/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUsersRepository } from '@modules/users/domains/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserTokensRepository } from '@modules/users/domains/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import '@modules/users/providers';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
