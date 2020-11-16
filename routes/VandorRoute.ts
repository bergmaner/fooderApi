import express, { Request, Response, NextFunction } from "express";
import { VandorLogin } from "../controllers";

const router = express.Router();

router.post("/login",VandorLogin);

router.post("/profile");
router.patch("/profile");
router.patch("/service");

router.get("/", (req: Request ,res: Response,next: NextFunction)=>{
    res.json({message:"Vandor"})
})

export {router as VandorRoute}