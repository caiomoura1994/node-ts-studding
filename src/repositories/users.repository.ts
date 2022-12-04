import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { IUser } from '@interfaces/users.interface';
import { UserModel } from '@entities/users.entity';
import { AppError } from '@/exceptions/AppError';

export default class UserRepository {
    userModel: typeof UserModel
    constructor() {
        this.userModel = UserModel;
    }
    public async userFindAll(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    public async userFindById(userId: string): Promise<IUser> {
        if (!userId) throw new AppError(400, "UserId is empty");

        const user = await this.userModel.findById(userId);
        if (!user) throw new AppError(400, "User doesn't exist");
        return user;
    }

    public async userCreate(userData: CreateUserDto): Promise<IUser> {
        if (!userData) throw new AppError(400, "userData is empty");

        const findUser = await this.userModel.findOne({ email: userData.email })
        if (findUser) throw new AppError(400, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const newUser = { ...userData, password: hashedPassword }
        const createUserData = await this.userModel.create(newUser)
        return createUserData;
    }

    public async userUpdate(userId: string, userData: CreateUserDto): Promise<IUser> {
        if (!userData || !userId) throw new AppError(400, "userData is empty");

        const findUser: IUser = await this.userFindById(userId);
        if (!findUser) throw new AppError(400, "User doesn't exist");

        const hashedPassword = await hash(userData.password, 10);
        await this.userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { ...userData, password: hashedPassword } }
        )
        const updatedUser = await this.userModel.findById(userId)
        return updatedUser;
    }

    public async userDelete(userId: string): Promise<void> {
        if (!userId) throw new AppError(400, "User doesn't existId");

        const findUser: IUser = await this.userFindById(userId)
        if (!findUser) throw new AppError(400, "User doesn't exist");
        await this.userModel.deleteOne({ _id: userId })
    }
}
