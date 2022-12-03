import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import { UserType } from '@typedefs/users.type';
import UserRepository from '@/repositories/users.repository';

@Resolver()
export class UserResolver extends UserRepository {
    @Query(() => [UserType], {
        description: 'List all Users',
    })
    async allUsers(): Promise<UserType[]> {
        return this.userFindAll()
    }
    @Query(() => UserType, {
        description: 'UserType find list',
    })
    async getUser(@Arg('userId') userId: string): Promise<UserType> {
        return this.userFindById(userId)
    }
    @Mutation(() => UserType, {
        description: 'UserType find list',
    })
    async createUser(@Arg('userInput') userInput: CreateUserDto): Promise<UserType> {
        return this.userCreate(userInput);
    }
    @Authorized()
    @Mutation(() => UserType, {
        description: 'UserType find list',
    })
    async updateUser(@Ctx('user') userId: string, @Arg('userInput') userInput: CreateUserDto): Promise<UserType> {
        return this.userUpdate(userId, userInput);
    }
}
