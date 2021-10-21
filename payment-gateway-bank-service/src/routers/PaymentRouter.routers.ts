import express from "express";
import { PaymentController } from "../controllers/PaymentController.contollers";
import { ApiClientVaildator } from "../middelwares/ApiClientValidator.middelwares";
import { InputValidator } from "../middelwares/InputValidation.middelware";
import { TransactionController } from "../controllers/TransactionController.controllers";
import { BankController } from "../controllers/BankController.controllers";
const apiClientVildator = new ApiClientVaildator();
const inputViladator = new InputValidator();
const paymentController = new PaymentController();
const transactionController = new TransactionController();
const bankConTroler = new BankController();
const paymnetRouter: express.IRouter = express.Router();

paymnetRouter.post("/api/pay", apiClientVildator.validateToken, inputViladator.validateTransacation, paymentController.pay);
paymnetRouter.get("/api/transaction/getTransactionByMarchant/:id", apiClientVildator.validateToken, transactionController.getTransacationByMarchantId);
paymnetRouter.put("/api/bank", apiClientVildator.validateToken, bankConTroler.addNewBank);
export default paymnetRouter
