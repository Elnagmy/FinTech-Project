
import { Request, Response } from "express";
import log from "../logger";
import TransactionModel from "../models/Transaction.model";
import { TransactionServices } from "../services/TransactionServices.services";
import { BankServices } from "../services/BankServices.services";
const transactionService = new TransactionServices();
const bankServices = new BankServices();
export class PaymentController {

    async pay(request: Request, response: Response) {
        try {
            let transaction = fromTransactionObject(request);

            try {
                let bank = await bankServices.getBankFromCardNumber(transaction.card.cardNumber);
                let status = await bankServices.connectToBank(transaction, bank);
            } catch (error: any) {
                log.error(error)
                transaction.status = "Fail";
                transaction.reason = "error in connecting to the bank " + error.message;
            }
            transaction = masksenstiveData(transaction);
            transaction = await transactionService.createNewTransacation(transaction);
            response.status(200).json(transaction);
        } catch (error: any) {
            response.status(500).json({ message: "Error has been occured =" + error.message });
        }

    }
}

function fromTransactionObject(request: Request): any {
    let txn = request.body.Transaction;
    const Transaction = new TransactionModel({
        merchantObjectId: txn.Marchant.marchantId,
        apiClientId: request.body.apiClient.APIClientID,
        card: {
            cardHolderName: txn.Card.cardHolderName,
            cardNumber: txn.Card.cardNumber,
            expiryDate: txn.Card.expiryDate,
            cvc: txn.Card.cvc
        },
        marchant: {
            marchantId: txn.Marchant.marchantId,
            marchantName: txn.Marchant.marchantName,
            bankName: txn.Marchant.bankName,
            bankAddress: txn.Marchant.bankAddress,
            accountNumber: txn.Marchant.accountNumber,
            iban: txn.Marchant.iban
        },
        amount: txn.amount,
        status: "Pending",
        reason: "",
        narrative: txn.narrative
    });

    return Transaction;
}
function masksenstiveData(transaction: any): any {
    let cardnumber: string = transaction.card.cardNumber;
    transaction.card.cardNumber = cardnumber.substring(0, 4) + "********" + cardnumber.substring(cardnumber.length - 4);
    transaction.card.expiryDate = "**/**";
    transaction.card.cvc = "****";
    return transaction;
}

