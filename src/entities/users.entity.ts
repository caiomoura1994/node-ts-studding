import { IUser } from "@/interfaces/users.interface";
import { getModelForClass, prop } from "@typegoose/typegoose";

class UserEntity implements IUser {
    @prop()
    public _id: string;

    @prop()
    public email: string;

    @prop()
    public password: string;
}

export const UserModel = getModelForClass(UserEntity);
