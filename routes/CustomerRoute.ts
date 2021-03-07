import express from "express";
import { CustomerLogin, CustomerSignUp, CustomerVerify } from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

router.post("/signup", CustomerSignUp);
router.post("/login", CustomerLogin);

router.use(Authenticate);

router.patch("/verify", CustomerVerify);
router.get("/otp");
router.get("/profile");
router.patch("/profile");


export { router as CustomerRoute };