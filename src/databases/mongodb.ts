import { mongoose } from "@typegoose/typegoose";
const { MONGO_DB_URL } = process.env;

export const initializeMongo = async () => {
    MONGO_DB_URL && await mongoose.connect(MONGO_DB_URL);
    console.log('MONGO_DB connected')
}
