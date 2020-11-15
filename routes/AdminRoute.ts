import express, { Request, Response, NextFunction } from "express";
import {createVandor, getVandors, getVandorById } from "../controllers";

const router = express.Router();

router.post("/vandor", createVandor);
router.get("/vandors", getVandors);
router.post("/vandor/:id", getVandorById);

router.get("/", (req: Request ,res: Response,next: NextFunction)=>{
    res.json({message:"ADMIN"})
})

export {router as AdminRoute}