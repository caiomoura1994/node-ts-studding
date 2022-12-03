import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import { UserType } from '@typedefs/users.type';
import AuthRepository from '@/repositories/auth.repository';

@Resolver()
export class AuthResolver extends AuthRepository {
    @Mutation(() => UserType, {
        description: 'UserType signup',
    })
    async signup(@Arg('userData') userData: CreateUserDto): Promise<UserType> {
        const user: UserType = await this.userSignUp(userData);
        return user;
    }

    @Mutation(() => UserType, {
        description: 'UserType login',
    })
    async login(@Arg('userData') userData: CreateUserDto): Promise<UserType> {
        const { findUser } = await this.userLogIn(userData);
        return findUser;
    }

    @Authorized()
    @Mutation(() => UserType, {
        description: 'UserType logout',
    })
    async logout(@Ctx('user') userData: any): Promise<UserType> {
        const user = await this.userLogOut(userData);
        return user;
    }
}
