import { ApplicationError } from "../../error-handler/applicationError.js";
import TransactionModel from "./transaction.schema.js";

export default class TransactionRepository {
    // Fetches transactions with pagination, search, and optional month filter
    async getAllTransaction(page, perPage, search, month) {
        try {
            const skip = (page - 1) * perPage;
            let query = {};

            // If search parameter is provided, construct a search query
            if (search) {
                query = {
                    $or: [
                        { title: { $regex: new RegExp(search, 'i') } },
                        { description: { $regex: new RegExp(search, 'i') } },
                    ],
                    price: { $type: 'number' },
                };
            }

            // If month parameter is provided, add month filter to the query
            if (month) {
                query.$expr = {
                    $eq: [
                        { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
                        parseInt(month),
                    ],
                };
            }

            // Fetch transactions and total count
            const transactions = await TransactionModel.find(query).skip(skip).limit(parseInt(perPage));
            const totalCount = await TransactionModel.countDocuments(query);

            // Return the result with pagination details
            return {
                success: true,
                msg: 'Transaction Getting Successful',
                transactions,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / perPage),
                totalRecords: totalCount,
            };
        } catch (err) {
            throw new ApplicationError("Something went wrong with Transaction collection", 500);
        }
    }

    // Fetches statistics for a given month
    async getStatics(month) {
        try {
            let query = {};

            // If month parameter is provided, add month filter to the query
            if (month) {
                query.$expr = {
                    $eq: [
                        { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
                        parseInt(month),
                    ],
                };
            }

            // Fetch transactions and calculate statistics
            const transactions = await TransactionModel.find(query);
            const soldItems = transactions.filter(transaction => transaction.sold === true);
            const notSoldItemsCount = transactions.filter(transaction => transaction.sold !== true).length;
            const totalSoldPrice = soldItems.reduce((total, transaction) => total + transaction.price, 0);

            // Return the calculated statistics
            return {
                soldItemsCount: soldItems.length,
                notSoldItemsCount,
                totalSoldPrice,
            };
        } catch (err) {
            throw new ApplicationError(err, 500);
        }
    }

    // Fetches data for a graph based on price ranges
    async getGraph(month) {
        try {
            let query = {};

            // If month parameter is provided, add month filter to the query
            if (month) {
                query.$expr = {
                    $eq: [
                        { $month: { $dateFromString: { dateString: "$dateOfSale" } } },
                        parseInt(month),
                    ],
                };
            }

            // Fetch transactions and categorize them by price range
            const transactions = await TransactionModel.find(query);
            const countByPriceRange = {};

            transactions.forEach(transaction => {
                const priceRange = this.categorizePriceRange(transaction.price);
                countByPriceRange[priceRange] = (countByPriceRange[priceRange] || 0) + 1;
            });

            // Map the data for the graph
            const customOrder = ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '900 Above'];
            const data = customOrder.map(range => ({ x: range, y: countByPriceRange[range] || 0 }));

            // Return the data for the graph
            return {
                data,
            };
        } catch (err) {
            throw new ApplicationError(err, 500);
        }
    }

    // Helper function to categorize price into ranges
    categorizePriceRange(price) {
        if (price >= 0 && price <= 100) {
            return '0-100';
        } else if (price > 100 && price <= 200) {
            return '101-200';
        } else if (price > 200 && price <= 300) {
            return '201-300';
        } else if (price > 300 && price <= 400) {
            return '301-400';
        } else if (price > 400 && price <= 500) {
            return '401-500';
        } else if (price > 500 && price <= 600) {
            return '501-600';
        } else if (price > 600 && price <= 700) {
            return '601-700';
        } else if (price > 700 && price <= 800) {
            return '701-800';
        } else if (price > 800 && price <= 900) {
            return '801-900';
        } else {
            return '900 Above';
        }
    }
}
