import { InputType, Field } from 'type-graphql';


@InputType()
export class PaginationInput {
  @Field()
  offset: number;

  @Field()
  limit: number;

  @Field()
  sortBy: string;
}


