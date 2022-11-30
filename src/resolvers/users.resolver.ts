import { Query, Resolver } from 'type-graphql';
import { User } from '@typedefs/users.type';

@Resolver()
export class userResolver {
    @Query(() => [User], {
        description: 'User find list',
    })
    async getUsers(): Promise<User[]> {
        const user: User = { email: "email", id: 2, password: "pass" };
        return [user, user, user];
    }
    @Query(() => User, {
        description: 'User find list',
    })
    async getUser(): Promise<User> {
        const user: User = { email: "email", id: 2, password: "pass" };
        return user;
    }
}
