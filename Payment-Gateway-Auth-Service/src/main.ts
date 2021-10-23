import database from "./database/database";
import * as dotenv from 'dotenv';
import express from "express";
import log from "./logger";
import _404 from "./Middlewares/404.middleware";
import AuthRouter from "./routers/authentication.router";
const API_PORT = process.env.API_PORT!;

dotenv.config();
database();
const app = express();
app.use(express.json());
app.use(AuthRouter);
app.use(_404) // for not exists routes
app.listen(process.env.PORT || 5000, () => {
    log.info(`Server listing at http://localhost:` + process.env.PORT || 5000);
});