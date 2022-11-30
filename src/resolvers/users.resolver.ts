import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@typedefs/users.type';
import UserRepository from '@/repositories/users.repository';

@Resolver()
export class userResolver extends UserRepository {
    @Query(() => [User], {
        description: 'List all Users',
    })
    async allUsers(): Promise<User[]> {
        return this.users
    }
    @Query(() => User, {
        description: 'User find list',
    })
    async getUser(@Arg('userId') userId: number): Promise<User> {
        return this.userFindById(userId)
    }
    @Mutation(() => User, {
        description: 'User find list',
    })
    async createUser(@Arg('userInput') userInput: CreateUserDto): Promise<User> {
        return this.userCreate(userInput);
    }
}
