import express, { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import {GeneratePassword, GenerateSalt} from "../utillity";

export const FindVandor = async(id: string | undefined, email?: string) => {

    if(email){
        return await Vandor.findOne({email: email});
    }

    return await Vandor.findById(id);

}

export const CreateVandor = async(req: Request ,res: Response,next: NextFunction) => {

const {name, ownerName, foodType, pinCode, address, phone, email, password} = <CreateVandorInput>req.body;

const vandor = await FindVandor("", email);

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

export const GetVandors = async(req: Request ,res: Response,next: NextFunction) => {

    const vandors = Vandor.find();

    if(vandors !== null){
        return res.json(vandors);
    }

    return res.json({"message": "vandors data does not exist"})
}
export const GetVandorById = async(req: Request ,res: Response,next: NextFunction) => {
    
    const vandorId = req.params.id;

    const vandor = await FindVandor(vandorId);

    if(vandor !== null){
        return res.json(vandor);
    }

    return res.json({"message": "vandor data does not exist"})

}