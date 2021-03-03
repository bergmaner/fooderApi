import express, { Request,Response, NextFunction } from "express";
import { GetFoodAvailability, RestaurantById, SearchFoods } from "../controllers";

const router = express.Router();

router.get("/food/availability/:pinCode", GetFoodAvailability);

router.get("/search/:pinCode", SearchFoods);

router.get("/reastaurant/:id", RestaurantById);


export { router as ShoppingRoute };