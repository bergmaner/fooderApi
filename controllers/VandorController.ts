import express, { Request, Response, NextFunction } from "express";
import { EditVandorInput, LoginVandorInput } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utillity";
import { FindVandor } from "./AdminController";

export const VandorLogin = async(req: Request ,res: Response,next: NextFunction) => {

    const {email, password} = <LoginVandorInput>req.body;

    const vandor = await FindVandor("", email);

    if(vandor !== null){

        const isValidate = ValidatePassword(password, vandor.password, vandor.salt);

        if(isValidate) {

            const signature = GenerateSignature({
                _id: vandor._id,
                email: vandor.email,
                name: vandor.name,
                foodType: vandor.foodType
            });

            return res.json(signature);
        }
        else return res.json({"message": "Password is not valid"});

    }
    return res.json({"message": "Login is not succesfull" })

}

export const GetVandorProfile = async(req: Request ,res: Response,next: NextFunction) =>{

    const user = req.user;
    console.log("User", req.user)
    if(user){
    
    const vandor = await FindVandor(user._id);
    return res.json(vandor);
    
}
    return res.json({"message" : "Vandor not found"});

}

export const UpdateVandorProfile = async(req: Request ,res: Response,next: NextFunction) =>{

    const {name,address,phone,foodType} = <EditVandorInput>req.body;
    const user = req.user;

    if(user){
    
    const vandor = await FindVandor(user._id);

        if(vandor !== null){
            vandor.name = name;
            vandor.address = address;
            vandor.phone = phone;
            vandor.foodType =  foodType;

            const savedResult = await vandor.save();

            return res.json(savedResult);
        }

    return res.json(vandor);
    
}

    return res.json({"message" : "Vandor not found"});



}

export const UpdateVandorService = async(req: Request ,res: Response,next: NextFunction) =>{

    const user = req.user;

    if(user){
    
    const vandor = await FindVandor(user._id);

        if(vandor !== null){
            vandor.serviceAvailable = !vandor.serviceAvailable;

            const savedResult = await vandor.save();

            return res.json(savedResult);
        }

    return res.json(vandor);
    
}

    return res.json({"message" : "Vandor not found"});




}
