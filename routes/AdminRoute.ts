import express, { Request, Response, NextFunction } from "express";
import {CreateVandor, GetVandors, GetVandorById } from "../controllers";

const router = express.Router();

router.post("/vandor", CreateVandor);
router.get("/vandors", GetVandors);
router.post("/vandor/:id", GetVandorById);

router.get("/", (req: Request ,res: Response,next: NextFunction)=>{
    res.json({message:"ADMIN"})
})

export {router as AdminRoute}