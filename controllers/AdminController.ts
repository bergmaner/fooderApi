import express, { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";

export const createVandor = async(req: Request ,res: Response,next: NextFunction) => {

const {name, ownerName, foodType, pinCode, address, phone, email, password} = <CreateVandorInput>req.body;

return res.json({name, ownerName, foodType, pinCode, address, phone, email, password});

}

export const getVandors = async(req: Request ,res: Response,next: NextFunction) => {
    
}
export const getVandorById = async(req: Request ,res: Response,next: NextFunction) => {
    
}