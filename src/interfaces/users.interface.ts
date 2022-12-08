import { IPaginatedLimitOffset } from "./pagination.interface";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
}

export interface IUsersPaginated extends IPaginatedLimitOffset {
  users: IUser[];
}