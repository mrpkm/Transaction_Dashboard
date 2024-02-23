import mongoose, { mongo } from "mongoose";

const transactionSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: String,
})

const TransactionModel = mongoose.model('Transaction', transactionSchema);
export default TransactionModel;