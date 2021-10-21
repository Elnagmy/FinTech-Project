import { Request, Response } from "express";
import log from "../logger";
import { TransactionServices } from "../services/TransactionServices.services";
const transacationService = new TransactionServices();
export class TransactionController {
    async getTransacationByMarchantId(request: Request, response: Response) {

        try {
            let marchantId = request.params.id;
            if (!marchantId) throw new Error(" You have to specify a vaild id in Request paramters");
            let listOfTransacation = await transacationService.getTransacationByMarchantId(marchantId);
            response.status(200).json(listOfTransacation);
        } catch (error: any) {
            log.error(error)
            response.status(500).json({ message: "Error has been occured =" + error.message });
        }

    }

}