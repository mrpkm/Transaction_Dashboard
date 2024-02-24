import mongoose from "mongoose";
import TransactionModel from "../feature/transaction/transaction.schema.js";

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected using mongoose");
    } catch (err) {
        console.log("MongoDb Error", err);
    }
}

