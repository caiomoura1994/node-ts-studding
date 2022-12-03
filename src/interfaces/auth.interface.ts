import { IUser } from "./users.interface";

export interface IAuth {
  findUser: IUser;
  cookie: string;
  token: string;
  expiresIn: number;
}
