import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { IUser } from '@interfaces/users.interface';
import { AppError } from '@/exceptions/AppError';
import { UserModel } from '@/entities/users.entity';
import { isEmpty } from '@/utils/util';
import { CreateUserDto } from '@/dtos/users.dto';

export default class AuthRepository {
    public async findById(userId?: String | number): Promise<IUser> {
        if (!userId) throw new AppError(400, "UserId is empty");
        const user = await UserModel.findById(userId);
        if (!user) throw new AppError(400, "IUser doesn't exist");
        return user;
    }

    public async userSignUp(userData: CreateUserDto): Promise<IUser> {
        if (isEmpty(userData)) throw new AppError(400, "userData is empty");

        const findUser: IUser = await UserModel.findOne({ email: userData.email });
        if (findUser) throw new AppError(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: IUser = await UserModel.create({ ...userData, password: hashedPassword });
        return createUserData;
    }

    public async userLogIn(userData: CreateUserDto): Promise<{ cookie: string; findUser: IUser, token: string, expiresIn: number }> {
        if (isEmpty(userData)) throw new AppError(400, "userData is empty");

        const findUser = await UserModel.findOne({ where: { email: userData.email } });
        if (!findUser) throw new AppError(409, `This email ${userData.email} was not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new AppError(409, "Password is not matching");

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser, token: tokenData.token, expiresIn: tokenData.expiresIn };
    }

    public async userLogOut(userId: string): Promise<IUser> {
        if (isEmpty(userId)) throw new AppError(400, "userId is empty");

        const findUser: IUser = await UserModel.findOne({ where: { id: userId } });
        if (!findUser) throw new AppError(409, "IUser doesn't exist");

        return findUser;
    }

    private createToken(user: IUser): { token: string, expiresIn: number } {
        const dataStoredInToken = { _id: user._id };
        const secretKey: string = process.env.SECRET_KEY;
        const expiresInOneHour: number = 60 * 60;
        const token = sign(
            dataStoredInToken,
            secretKey,
            { expiresIn: expiresInOneHour }
        )
        return {
            expiresIn: expiresInOneHour,
            token
        };
    }

    private createCookie(tokenData: { token: string, expiresIn: number }): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
