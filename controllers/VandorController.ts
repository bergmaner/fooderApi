import express, { Request, Response, NextFunction } from "express";
import { EditVandorInput, LoginVandorInput } from "../dto";
import { createFoodInputs } from "../dto/Food.dto";
import { Food } from "../models";
import { GenerateSignature, ValidatePassword } from "../utility";
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

export const UpdateVandorCoverImage = async(req: Request ,res: Response,next: NextFunction) =>{

    const user = req.user;

    if(user){
    
            const vandor = await FindVandor(user._id);

            if(vandor !== null){

                const files = req.files as [Express.Multer.File]
                const images = files.map((file: Express.Multer.File) => file.filename); 

                vandor.coverImages.push(...images);
                const result = await vandor.save();

                return res.json(result);
            }
        
        }
    
        return res.json({"message" : "Something went wrong with updating image"});



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

export const AddFood = async(req: Request ,res: Response,next: NextFunction) =>{

    const user = req.user;

    if(user){
    
            const {name, description, category, foodType, readyTime, price} = <createFoodInputs>req.body;
            const vandor = await FindVandor(user._id);

            if(vandor !== null){

                const files = req.files as [Express.Multer.File]
                const images = files.map((file: Express.Multer.File) => file.filename); 

                const createdFood = await Food.create({
                    vandorId: vandor._id,
                    name: name,
                    description: description,
                    category: category,
                    foodType: foodType,
                    images: images,
                    readyTime: readyTime,
                    price: price,
                    rating: 0,
                });
                vandor.foods.push(createdFood);
                const result = await vandor.save();

                return res.json(result);
            }
        
        }
    
        return res.json({"message" : "Something went wrong with adding food"});

}

export const GetFoods = async(req: Request ,res: Response,next: NextFunction) =>{

    const user = req.user;

    if(user){
        
        const foods = await Food.find({ vandorId: user._id});
        if(foods != null){
            return res.json(foods);
        }

        }
    
        return res.json({"message" : "Food informations not found"});

}