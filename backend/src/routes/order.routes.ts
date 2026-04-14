import { Router } from "express";
import productrouter from "./product.routes";
import { asyncHandler } from "../utils/asynchandler";
import { ProductController } from "../controllers/Product.controller";
import { OrderController } from "../controllers/Order.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { updateOrderStatusMiddleware } from "../middleware/order.middleware";

const orderrouter = Router();
orderrouter.post('/checkout', requireAuth,asyncHandler(OrderController.checkout))
orderrouter.get('/getcustomerorders', requireAuth, updateOrderStatusMiddleware, asyncHandler(OrderController.getCustomerOrders))
orderrouter.get('/getorderdetails/:id', requireAuth, updateOrderStatusMiddleware, asyncHandler(OrderController.getOrderDetails));
orderrouter.delete('/cancelorder/:id', requireAuth, updateOrderStatusMiddleware, asyncHandler(OrderController.cancelorder));

export default orderrouter;






























