import database from "../database/database";
import TransactionModel from "../models/Transaction.model";

export class TransactionRepository {
    async saveTransacation(transaction: any) {
        database();
        try {
            return await transaction.save();
        } catch (err) {
            throw err;
        }

    }


    async findTransacation(filter: any) {
        database();
        try {
            const results = await TransactionModel.find(filter);
            return results;
        } catch (err) {
            throw err;
        }
    }

}