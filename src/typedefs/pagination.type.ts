import { IPaginatedLimitOffset } from '@/interfaces/pagination.interface';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationType implements IPaginatedLimitOffset {
  @Field()
  offset: number;
  @Field()
  limit: number;
  @Field()
  total: number;
}
