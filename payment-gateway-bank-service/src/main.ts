import database from "./database/database";
import * as dotenv from 'dotenv';

import express from "express";
import log from "./logger";
import paymnetRouter from "./routers/PaymentRouter.routers";
import transcationRouter from "./routers/PaymentRouter.routers";
import _404 from "./middelwares/404.middleware";
const API_PORT = process.env.Port!;

dotenv.config();

database();
const app = express();
app.use(express.json());
app.use(paymnetRouter);
app.use(transcationRouter);
app.use(_404);// for not exists routes
app.listen(process.env.PORT || 31000, () => {
    log.info(`Server listing at http://localhost:` + process.env.PORT || 31000);
})