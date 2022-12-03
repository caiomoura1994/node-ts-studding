import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
