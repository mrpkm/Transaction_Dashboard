import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./reducer/transactionReducer";

export const store = configureStore({
    reducer: {
        transactionsReducer,

    }
})