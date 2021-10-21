import { TransactionRepository } from "../repositories/TransactionRepository.repositories";
const transacationRepository = new TransactionRepository();
export class TransactionServices {

    public async createNewTransacation(transaction: any) {
        return await transacationRepository.saveTransacation(transaction)
    }


    public async getTransacationByMarchantId(marchantId: any) {
        let filter = { merchantObjectId: marchantId }
        return await transacationRepository.findTransacation(filter)
    }
}