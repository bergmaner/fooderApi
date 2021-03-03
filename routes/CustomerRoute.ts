import express from "express";
import { CustomerLogin, CustomerSignUp } from "../controllers";

const router = express.Router();

router.post("/signup", CustomerSignUp);
router.post("/login", CustomerLogin);
router.patch("/verify");
router.get("/otp");
router.get("/profile");
router.patch("/profile");


export { router as CustomerRoute };