import database from "../database/database";
import log from "../logger";
import BankModel from "../models/bank.model";

export class BankRepository {

    public async saveBank(bank: any) {
        database();
        console.log(bank);
        log.info(bank);
        try {
            return await bank.save();
        } catch (err) {
            throw err;
        }
    }

    public async findBank(filter: any) {
        database();
        try {
            const results = await BankModel.findOne(filter);
            log.info("Finding the bank ")
            log.info(results);
            return results;
        } catch (err) {
            throw err;
        }
    }
}