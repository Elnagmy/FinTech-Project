import express from "express";
import { TransactionController } from "../controllers/TransactionController.controllers";
import { ApiClientVaildator } from "../middelwares/ApiClientValidator.middelwares";

const apiClientVildator = new ApiClientVaildator();
const transactionController = new TransactionController();

const transcationRouter: express.IRouter = express.Router();

transcationRouter.get("/api/", apiClientVildator.validateToken, transactionController.getTransacationByMarchantId);

export default transcationRouter