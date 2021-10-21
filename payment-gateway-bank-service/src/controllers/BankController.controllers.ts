import { Request, Response } from "express";
import log from "../logger";
import BankModel from "../models/bank.model";
import { BankServices } from "../services/BankServices.services";

const bankService = new BankServices();

export class BankController {
    public async addNewBank(request: Request, response: Response) {
        try {
            let bank = createBankObject(request);
            log.info(bank);
            bank = await bankService.createNewBank(bank);

            response.status(200).json(bank);
        } catch (error: any) {
            response.status(500).json({ message: "Error has been occured =" + error.message });
        }

    }


}

function createBankObject(request: Request): any {
    let bankNamme = request.body.bankNamme;
    let bankContact = request.body.bankContact;
    let bankAddress = request.body.bankAddress;
    let bankAPIPoint = request.body.bankAPIPoint;
    let bankUserName = request.body.bankUserName;
    let bankPassword = request.body.bankPassword;
    let bankCardDigit = request.body.bankCardDigit;
    try {
        if (!bankNamme || !bankContact || !bankAddress || !bankAPIPoint || !bankUserName || !bankPassword || !bankCardDigit) {
            throw new Error(" You have to provide all fileds")
        }
        let bank = new BankModel({
            bankNamme: request.body.bankNamme,
            bankAddress: request.body.bankAddress,
            bankContact: request.body.bankContact,
            bankAPIPoint: request.body.bankAPIPoint,
            bankUserName: request.body.bankUserName,
            bankPassword: request.body.bankPassword,
            bankCardDigit: request.body.bankCardDigit
        });

        return bank;
    } catch (error) {
        throw error
    }
}