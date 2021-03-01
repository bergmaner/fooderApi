import express, {Request, Response, NextFunction} from "express";
import { Vandor } from "../models";


export const GetFoodAvailability = async(req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;

    console.log("pincode", pinCode);
    const result = await Vandor.find({pinCode: pinCode, serviceAvailable: false})
    .sort([['rating', 'descending']])
    .populate("foods")

    if(result.length > 0){
        return res.status(200).json(result);
    }

    return res.status(400).json({message: "Data not found"});

}

export const SearchFoods = async(req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;

    console.log("pincode", pinCode);
    const result = await Vandor.find({pinCode: pinCode, serviceAvailable: false})
    .populate("foods")

    if(result.length > 0){

        let foodResults: any = [];
        result.map( item => foodResults.push(...item.foods));
        return res.status(200).json(foodResults);
    }

    return res.status(400).json({message: "Data not found"});

}

export const RestaurantById = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    console.log("pincode", id);
    const result = await Vandor.findById(id).populate("foods");

    if(result){
        return res.status(200).json(result);
    }

    return res.status(400).json({message: "Data not found"});

}