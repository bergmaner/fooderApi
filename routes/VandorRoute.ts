import express, { Request, Response, NextFunction } from "express";
import { GetVandorProfile, VandorLogin } from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

router.post("/login",VandorLogin);

router.use(Authenticate);

router.get("/profile", GetVandorProfile );
router.patch("/profile");
router.patch("/service");

router.get("/", (req: Request ,res: Response,next: NextFunction)=>{
    res.json({message:"Vandor"})
})

export {router as VandorRoute}