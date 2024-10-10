import {  getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository';
import { IFindProducts } from '@modules/products/domains/models/IFindProducts';
import { IUpdateStockProducts } from '@modules/products/domains/models/IUpdateStockProducts';
import { ICreateProducts } from '@modules/products/domains/models/ICreateProducts';

export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProducts): Promise<Product> {
    const createdProduct = this.ormRepository.create({ name, price, quantity });

    return createdProduct;
  }

  public async save(product: Product): Promise<Product> {
    const saveProduct = this.ormRepository.save(product);

    return saveProduct;
  }

  public async remove(product: Product): Promise<void> {
   this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProducts[]): Promise<void> {
   this.ormRepository.save(products);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAll(): Promise<Product[]> {
      const products = this.ormRepository.find();

      return products;
    };

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
