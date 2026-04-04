import { Router } from "express";
import productrouter from "./product.routes";
import { asyncHandler } from "../utils/asynchandler";
import { ProductController } from "../controllers/Product.controller";
import { OrderController } from "../controllers/Order.controller";
import { requireAuth } from "../middleware/auth.middleware";

const orderrouter = Router();
orderrouter.post('/checkout', requireAuth,asyncHandler(OrderController.checkout))
orderrouter.get('/getcustomerorders', requireAuth, asyncHandler(OrderController.getCustomerOrders))
orderrouter.get('/:id', requireAuth, asyncHandler(OrderController.getOrderDetails));

export default orderrouter;
































