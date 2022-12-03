import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import { UserType } from '@typedefs/users.type';
import AuthRepository from '@/repositories/auth.repository';
import { AuthType } from '@/typedefs/auth.type';

@Resolver()
export class AuthResolver extends AuthRepository {
    @Mutation(() => UserType, {
        description: 'UserType signup',
    })
    async signup(@Arg('userData') userData: CreateUserDto): Promise<UserType> {
        const user: UserType = await this.userSignUp(userData);
        return user;
    }

    @Mutation(() => AuthType, {
        description: 'UserType login',
    })
    async login(@Arg('userData') userData: CreateUserDto): Promise<AuthType> {
        const loggedUser = await this.userLogIn(userData);
        return loggedUser;
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
