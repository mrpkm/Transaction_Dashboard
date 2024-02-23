import express from "express";
import TransactionController from "./transaction.controller.js";


const transactionRouter = express.Router();
const transactionController = new TransactionController();
transactionRouter.get("/get-all-transaction", transactionController.getAllTransaction);
transactionRouter.get("/get-statics", transactionController.getStatics);
transactionRouter.get("/get-graph", transactionController.getGraph);
export default transactionRouter;