import { IsEmail, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IUser } from '@/interfaces/users.interface';

@InputType()
export class CreateUserDto implements Partial<IUser> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
