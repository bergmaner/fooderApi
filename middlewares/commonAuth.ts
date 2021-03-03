import { AuthPayload } from "../dto";
import {Request, Response, NextFunction} from "express";
import { ValidateSignature } from "../utility";

declare global {
    namespace Express{
        interface Request{
            user?: AuthPayload
        }
    }
}

export const Authenticate = async(req: Request, res: Response, next: NextFunction)=>{

    const isValidate = await ValidateSignature(req);

    if(isValidate) {
        console.log("YEEY")
        next();
    }
else{
    return res.json({"message": "User is not Authorized"});
}
}