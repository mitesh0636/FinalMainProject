import { Router } from "express";
import { asyncHandler } from "../utils/asynchandler";
import { CartController } from "../controllers/Cart.controller";
import { requireAuth } from "../middleware/auth.middleware";

const cartrouter = Router();

cartrouter.get('/createcart', requireAuth, asyncHandler(CartController.getOrCreateCart));
// cartrouter.get('/getcart', requireAuth, asyncHandler(CartController.getCart));
cartrouter.post('/addcart', requireAuth, asyncHandler(CartController.addToCart));
cartrouter.post('/update/:id', requireAuth, asyncHandler(CartController.updateQuantity));
cartrouter.delete('/removeItem/:id', requireAuth, asyncHandler(CartController.removeItem));
cartrouter.delete('/clearcart', requireAuth, asyncHandler(CartController.clearCart));

export default cartrouter

