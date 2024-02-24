import "./env.js"

import express from "express";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectUsingMongoose } from "./src/config/mongooseMongodb.js";
import transactionRouter from "./src/feature/transaction/transaction.routes.js";

const server = express();

//load all the environment variable in the application


server.use(cors());



server.use(cookieParser());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/transaction', transactionRouter);
server.get('/', (req, res) => {
    res.send('Hello world');
})

//Error handler middleware
server.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApplicationError) {
        return res.status(err.code).send({ succes: false, msg: err.message })
    }
    res.status(500).send({ succes: false, msg: 'Something went wrong, please try later' });
})

//middleware to handle 404 requests.
server.use((req, res) => {
    res.status(404).send("API not found");
})


server.listen(4100, () => {
    console.log('server is listening on port : 4100');
    connectUsingMongoose();
})