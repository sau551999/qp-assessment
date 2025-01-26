import express from "express";
import { viewAvailableItems, bookGroceryItems } from "../controllers/userController";

const router = express.Router();

router.get("/view", viewAvailableItems);
//router.post("/book", bookGroceryItems);

export default router;
