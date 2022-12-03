import { User } from "@/typedefs/users.type";
import { getModelForClass, prop } from "@typegoose/typegoose";

class UserEntity implements User {
    @prop()
    public _id: string;

    @prop()
    public email: string;

    @prop()
    public password: string;
}

export const UserModel = getModelForClass(UserEntity);
