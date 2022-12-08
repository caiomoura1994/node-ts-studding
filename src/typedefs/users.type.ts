import { IUser } from '@/interfaces/users.interface';
import { Field, ObjectType } from 'type-graphql';
import { PaginationType } from './pagination.type';

@ObjectType()
export class UserType implements IUser {
  @Field()
  _id?: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class PaginatedUserType extends PaginationType {
  @Field(type => [UserType])
  users: UserType[];
}

