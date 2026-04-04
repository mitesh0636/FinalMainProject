import { NextFunction } from "express";
import { AppDataSource } from "../data.source";
import { ORDER, OrderStatus } from "../entities/Order";

export const updateOrderStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    if (!userId) return next();

    const orderRepo = AppDataSource.getRepository(ORDER);
    const now = new Date();

    const pendingOrders = await orderRepo.find({
        where: { 
            user: { id: userId }, 
            orderstatus: OrderStatus.ORDERED 
        }
    });

    for (const order of pendingOrders) {
        const orderDate = new Date(order.orderDate);
        const hoursPassed = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

        // If more than 24 hours have passed, update to DISPATCHED
        if (hoursPassed >= 24) {
            order.orderstatus = OrderStatus.DISPATCHED;
            await orderRepo.save(order);
        }
    }

    next();
};