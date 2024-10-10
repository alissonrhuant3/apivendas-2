import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';



@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({ id }: IShowProduct): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
