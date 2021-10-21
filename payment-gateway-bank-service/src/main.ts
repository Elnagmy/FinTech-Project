import database from "./database/database";
import * as dotenv from 'dotenv';
import express from "express";
import log from "./logger";
import paymnetRouter from "./routers/PaymentRouter.routers";
import transcationRouter from "./routers/PaymentRouter.routers";
import _404 from "./middelwares/404.middleware";
const API_PORT = process.env.API_PORT!;

dotenv.config();

database();
const app = express();
app.use(express.json());
app.use(paymnetRouter);
app.use(transcationRouter);
//app.use(_404) // for not exists routes
app.listen(API_PORT, () => {
    log.info(`Server listing at http://localhost:` + API_PORT);
})