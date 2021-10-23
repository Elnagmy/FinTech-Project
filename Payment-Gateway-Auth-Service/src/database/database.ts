import mongoose from "mongoose";
import log from "../logger";
import * as dotenv from 'dotenv';
import { SecretCrypto } from "../util/SecretCrypto.util";

dotenv.config();


export default async () => {
    const secretCrypto = new SecretCrypto();
    const MONGO_URI = secretCrypto.decyptSecret(process.env.MONGO_URI ?? '');
    log.info("trying Database connection on " + MONGO_URI);
    return mongoose.connect(MONGO_URI).then(() => {
        log.info("Database connected");
    }).catch((error) => {
        log.error("db error", error);
        process.exit(1);
    });
};