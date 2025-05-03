import express from "express";
import {
  addToCartController,
  getCartController,
  removeFromCartController,
  updateCartQuantityController,
} from "../controllers/cartController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add to cart
router.post("/add", requireSignIn, addToCartController);

// Get cart
router.get("/get", requireSignIn, getCartController);

// Remove from cart
router.delete("/remove/:productId", requireSignIn, removeFromCartController);

// Update cart quantity
router.put("/update/:productId", requireSignIn, updateCartQuantityController);

export default router; 