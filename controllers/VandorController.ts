import express, { Request, Response, NextFunction } from "express";
import { LoginVandorInput } from "../dto";
import { ValidatePassword } from "../utillity";
import { FindVandor } from "./AdminController";

export const VandorLogin = async(req: Request ,res: Response,next: NextFunction) => {

    const {email, password} = <LoginVandorInput>req.body;

    const vandor = await FindVandor("", email);

    if(vandor !== null){

        const isValidate = ValidatePassword(password, vandor.password, vandor.salt);

        if(isValidate) return res.json(vandor);
        else return res.json({"message": "Password is not valid"});

    }
    return res.json({"message": "Login is not succesfull" })

}

export const GetVandorProfile = async(req: Request ,res: Response,next: NextFunction) =>{

}

export const UpdateVandorProfile = async(req: Request ,res: Response,next: NextFunction) =>{

}

export const IpdateVandorService = async(req: Request ,res: Response,next: NextFunction) =>{

}
