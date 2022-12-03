import { IUser } from '@/interfaces/users.interface';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserType implements IUser {
  @Field()
  _id?: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
