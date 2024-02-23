import TransactionRepository from "./transaction.repository.js";

export default class TransactionController {
    constructor() {
        // Create an instance of TransactionRepository to access its methods
        this.transactionRepository = new TransactionRepository();
    }

    // Controller method to get statistics for a given month
    getStatics = async (req, res, next) => {
        try {
            // Extract month from request query parameters
            const { month } = req.query;

            // Fetch statistics using the repository method
            const response = await this.transactionRepository.getStatics(month);

            // Send the response back to the client
            return res.status(200).send(response);
        } catch (err) {
            // Pass any errors to the error handling middleware
            next(err);
        }
    }

    // Controller method to get data for a graph based on price ranges
    getGraph = async (req, res, next) => {
        try {
            // Extract month from request query parameters
            const { month } = req.query;

            // Fetch graph data using the repository method
            const response = await this.transactionRepository.getGraph(month);

            // Send the response back to the client
            return res.status(200).send(response);
        } catch (err) {
            // Log and send a generic error message if an error occurs
            console.log("Error in fetching graph data", err);
            res.status(500).send("Something went wrong");
        }
    }

    // Controller method to get all transactions with pagination, search, and optional month filter
    getAllTransaction = async (req, res) => {
        try {
            // Extract query parameters from the request
            const { page = 1, perPage = 10, search = '', month } = req.query;

            // Fetch transactions using the repository method
            const response = await this.transactionRepository.getAllTransaction(page, perPage, search, month);

            // Send the response back to the client
            return res.status(200).send(response);
        } catch (err) {
            // Send a generic error message if an error occurs during processing
            res.status(500).send("Something went wrong");
        }
    }
}
