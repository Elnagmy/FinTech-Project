import { Request, Response, NextFunction } from "express";

export class InputValidator {
    validateTransacation(request: Request, response: Response, next: NextFunction) {
        console.log("validateTransacation");
        next();
    }

}