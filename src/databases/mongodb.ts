import { mongoose } from "@typegoose/typegoose";

export const initializeMongo = async () => {
    const MONGO_DB_URL = process.env.MONGO_DB_URL;
    MONGO_DB_URL && await mongoose.connect(MONGO_DB_URL);
    console.log('MONGO_DB connected', MONGO_DB_URL)
}
