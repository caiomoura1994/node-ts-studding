import { mongoose } from "@typegoose/typegoose";
const { MONGO_DB_URI } = process.env;

export const initializeMongo = async () => {
    MONGO_DB_URI && await mongoose.connect(MONGO_DB_URI);
}
