
import axios, { AxiosResponse } from "axios";
import { request } from "express";
import log from "../logger";
import { BankRepository } from "../repositories/BankRepository.repositories";
const bankRepository = new BankRepository();

export class BankServices {
    public async createNewBank(bank: any) {
        return await bankRepository.saveBank(bank);
    }

    public async connectToBank(transaction: any, bank: any) {

        try {
            let data = {
                cardid: transaction.card.cardHolderName,
                ccv: transaction.card.cvc,
                amount: transaction.amount / 100,
                merchant: transaction.marchant.marchantName,
                timestamp: "13/10/2021",
                Payment_gateway_ID: 100
            };
            const headers = {
                'Content-Type': 'application/json',
                'Username': bank.bankUserName,
                'Password': bank.bankPassword
            };
            log.info("Calling Bank service on " + bank.bankAPIPoint);
            let response: AxiosResponse = await axios.post(bank.bankAPIPoint, data, { headers: headers });
            let result = JSON.stringify(await response.data);
            log.info("brank response to the transcation = " + result);
            if (result != "sucess") {
                transaction.status = "Fail";
                transaction.reason = "error in connecting to the bank " + result;
            } else {
                transaction.status = "sucess";
                transaction.reason = "";
            }
            return transaction;
        } catch (error: any) {
            throw error;
        }

    }

    public async getBankFromCardNumber(cardNumber: string) {
        let bankIdentifer = getBankIdentifer(cardNumber);
        let filter = { bankCardDigit: bankIdentifer };
        return await bankRepository.findBank(filter);

    }
}

function getBankIdentifer(cardNumber: string) {

    return 4525;
}
