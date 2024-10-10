import User from "@modules/users/infra/typeorm/entities/User";
import { IReqCreateUser } from "../models/IReqCreateUser";

export interface IUsersRepository {
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create({ name, email, password }: IReqCreateUser): Promise<User>;
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}
