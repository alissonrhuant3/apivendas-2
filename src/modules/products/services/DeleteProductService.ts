import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { IDeleteProducts } from '../domains/models/IDeleteProducts';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProducts): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    // const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
