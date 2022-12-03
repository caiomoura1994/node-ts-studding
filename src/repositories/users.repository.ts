import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { IUser } from '@interfaces/users.interface';
import { randomInt } from 'crypto';
import { AppError } from '@/exceptions/AppError';

export default class UserRepository {
    users: IUser[] = []
    public async userFindAll(): Promise<IUser[]> {
        return this.users;
    }

    public async userFindById(userId: String): Promise<IUser> {
        if (!userId) throw new AppError(400, "UserId is empty");

        const user = this.users.find((user) => user._id === userId);
        if (!user) throw new AppError(400, "IUser doesn't exist");
        return user;
    }

    public async userCreate(userData: CreateUserDto): Promise<IUser> {
        if (!userData) throw new AppError(400, "userData is empty");

        const findUser = this.users.find((user) => user.email === userData.email);
        if (findUser) throw new AppError(400, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const newUser = { ...userData, password: hashedPassword, _id: String(randomInt(4)) }
        this.users.push(newUser);
        return newUser;
    }

    public async userUpdate(userId: string, userData: CreateUserDto): Promise<IUser> {
        if (!userData) throw new AppError(400, "userData is empty");

        const findUser: IUser = await this.userFindById(userId);
        if (!findUser) throw new AppError(400, "IUser doesn't exist");

        const hashedPassword = await hash(userData.password, 10);
        this.users = this.users.filter((user) => {
            let formattedUser = user
            if (user._id == userId) formattedUser.password = hashedPassword;
            return formattedUser
        })

        const updateUser: IUser = await this.userFindById(userId);
        return updateUser;
    }

    public async userDelete(userId: string): Promise<IUser[]> {
        if (!userId) throw new AppError(400, "IUser doesn't existId");

        const findUser: IUser = await this.userFindById(userId)
        if (!findUser) throw new AppError(400, "IUser doesn't exist");

        return this.users.filter((user) => user._id !== userId);
    }
}
