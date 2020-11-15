import express, { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import {GeneratePassword, GenerateSalt} from "../utillity";

export const createVandor = async(req: Request ,res: Response,next: NextFunction) => {

const {name, ownerName, foodType, pinCode, address, phone, email, password} = <CreateVandorInput>req.body;

const vandor = await Vandor.findOne({email: email});

if(vandor !== null){
    return res.json({ "message": "A vandor is exist with this email ID"});
}

const salt = await GenerateSalt();
const userPassword = await GeneratePassword(password, salt);

const createdVandor = await Vandor.create({
    name: name,
    ownerName: ownerName,
    foodType: foodType,
    pinCode: pinCode,
    address: address,
    phone: phone,
    email: email,
    password: userPassword,
    salt: salt,
    serviceAvailable: false,
    coverImages: [],
    rating: 0
});

return res.json(createdVandor);

}

export const getVandors = async(req: Request ,res: Response,next: NextFunction) => {
    
}
export const getVandorById = async(req: Request ,res: Response,next: NextFunction) => {
    
}