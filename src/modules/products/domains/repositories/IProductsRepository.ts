import Product from "@modules/products/infra/typeorm/entities/Product";
import { IFindProducts } from "../models/IFindProducts";
import { IUpdateStockProducts } from "../models/IUpdateStockProducts";
import { ICreateProducts } from "../models/ICreateProducts";

export interface IProductsRepository {
  findByName(name: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  updateStock(products: IUpdateStockProducts[]): Promise<void>;
  create({ name, price, quantity }: ICreateProducts): Promise<Product>;
  save(product: Product): Promise<Product>;
  remove(product: Product): Promise<void>;
}
