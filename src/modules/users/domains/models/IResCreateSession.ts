import User from "@modules/users/infra/typeorm/entities/User";

export interface IResCreateSession {
  user: User;
  token: string;
}
