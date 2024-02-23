import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
    month: { value: 3, label: 'March' },
    statics: null,
    graph: null,
    data: null,
    isLoading: false,
    success: false,
    errors: null,
}

const apiUrl = 'http://localhost:4100/api/transaction';

// Async thunk for fetching transaction data
export const getTransactionAsync = createAsyncThunk("transactions/get-transaction",
    async ({ page, searchQuery, month }, thunkAPI) => {
        try {
            console.log(month);
            const response = await axios.get(`${apiUrl}/get-all-transaction?page=${page}&search=${searchQuery}&month=${month.value}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data || [{ msg: "server not responding" }]);
        }
    }
);

// Async thunk for fetching statics data
export const getStaticsAsync = createAsyncThunk("transactions/get-statics",
    async ({ month }, thunkAPI) => {
        try {
            const response = await axios.get(`${apiUrl}/get-statics?month=${month.value}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data || [{ msg: "server not responding" }]);
        }
    }
);

// Async thunk for fetching graph data
export const getGraphAsync = createAsyncThunk("transactions/get-graph",
    async ({ month }, thunkAPI) => {
        try {
            const response = await axios.get(`${apiUrl}/get-graph?month=${month.value}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data || [{ msg: "server not responding" }]);
        }
    }
);

// Redux slice for managing transaction state
const transactionslice = createSlice({
    name: "transactions",
    initialState: INITIAL_STATE,
    reducers: {
        setMonth: (state, action) => {
            state.month = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Reducer for handling successful completion of getTransactionAsync
        builder.addCase(getTransactionAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
            // Reducer for handling pending state of getTransactionAsync
            .addCase(getTransactionAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            // Reducer for handling rejected state of getTransactionAsync
            .addCase(getTransactionAsync.rejected, (state, action) => {
                state.isLoading = false;
            })

        // Reducer for handling successful completion of getStaticsAsync
        builder.addCase(getStaticsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.statics = action.payload;
        })
            // Reducer for handling pending state of getStaticsAsync
            .addCase(getStaticsAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            // Reducer for handling rejected state of getStaticsAsync
            .addCase(getStaticsAsync.rejected, (state, action) => {
                state.isLoading = false;
            })

        // Reducer for handling successful completion of getGraphAsync
        builder.addCase(getGraphAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.graph = action.payload;
        })
            // Reducer for handling pending state of getGraphAsync
            .addCase(getGraphAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            // Reducer for handling rejected state of getGraphAsync
            .addCase(getGraphAsync.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

// Selector to get the transaction state
export const transactionSelector = (state) => state.transactionsReducer;

// Actions exported from the slice
export const transactionActions = transactionslice.actions;

// Reducer exported from the slice
export const transactionsReducer = transactionslice.reducer;
