import { IAuth } from '@/interfaces/auth.interface';
import { Field, ObjectType } from 'type-graphql';
import { UserType } from './users.type';

@ObjectType()
export class AuthType implements IAuth {
  @Field()
  findUser: UserType;

  @Field()
  cookie: string;

  @Field()
  token: string;

  @Field()
  expiresIn: number;
}
