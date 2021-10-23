
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from 'axios';
import log from "../logger";

const Auth_API_URL = process.env.Auth_API_URL ?? '';
export class ApiClientVaildator {
    async validateToken(request: Request, response: Response, next: NextFunction) {
        try {
            const token = request.body.token || request.query.token || request.headers["x-access-token"];

            if (!token) {
                throw new Error("A token is required for authentication");
            }
            log.info("Calling Authintacation service on " + Auth_API_URL);
            let response: AxiosResponse = await axios.post(Auth_API_URL, { token: token });
            log.info("Recived payment request from API client " + JSON.stringify(response.data));
            request.body.apiClient = response.data;
            next();

        } catch (error: any) {
            log.error(error);
            response.status(401).json({ isucess: false, message: "Token Validation faild please use a valid token " });
        }



    }

}