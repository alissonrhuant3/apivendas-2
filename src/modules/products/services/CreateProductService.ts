import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';
import { ICreateProducts } from '../domains/models/ICreateProducts';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';


@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProducts): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
