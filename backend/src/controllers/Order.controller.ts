import { Request, Response } from "express";
import { AppDataSource } from "../data.source";
import { CART } from "../entities/Cart";
import { ORDER, OrderStatus, PAYMENTMETHOD } from "../entities/Order";
import { ORDERITEM } from "../entities/OrderItem";
import { PRODUCT } from "../entities/Product";
import { CARTITEM } from "../entities/Cartitem";

export class OrderController {
    private static orderRepository = AppDataSource.getRepository(ORDER);
    private static orderItemRepository = AppDataSource.getRepository(ORDERITEM);
    private static cartRepository = AppDataSource.getRepository(CART);
    private static productRepository = AppDataSource.getRepository(PRODUCT);

static async checkout(req: Request, res: Response) {
        const userId = (req as any).user.id;
        const { paymentMethod } = req.body;
        let TotalPayment = 0;
        let SubTotal = 0;
        let TaxApplied = 0;
        let total = 0;


        await AppDataSource.transaction(async (Manager) => {
            const cart = await Manager.findOne(CART, {
                where: { user: { id: userId } },
                relations: ["cartITEM", "cartITEM.productc"]
            });
            if (!cart || cart.cartITEM.length === 0) throw new Error("Empty Cart");

            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 2);

                const newOrder = Manager.create(ORDER, {
                user: { id: userId },
                paymentMethod: paymentMethod,
                TotalPayment: TotalPayment,
                deliveryDate: deliveryDate,
                orderstatus: OrderStatus.ORDERED
            });
            const savedOrder = await Manager.save(newOrder);

            for (const item of cart.cartITEM) {
                const orderItem = Manager.create(ORDERITEM, {
                    order: savedOrder,
                    product: item.productc,
                    priceAtPurchase: item.productc.price,
                    quantity: item.quantity
                });
                SubTotal = SubTotal + (item.productc.price * item.quantity);
                console.log(total);
                await Manager.save(orderItem);
            }
            TaxApplied = ((12/100) * SubTotal);
            total = SubTotal + TaxApplied;
            await OrderController.orderRepository.update(savedOrder.id, {SubTotal: SubTotal, TaxApplied: TaxApplied, TotalPayment: total})

            await Manager.delete(CARTITEM, { cart: { id: cart.id } });
        });
        return res.status(201).json({ message: "Order placed" });
}


 static async getCustomerOrders(req: Request, res: Response) {
        const userId = (req as any).user.id;
        const orders = await OrderController.orderRepository.find({
            where: {user: {id: userId}},
            order: {orderDate: 'DESC'}
        });
        return res.json(orders);
 }


 static async getOrderDetails(req:Request, res: Response) {
        const orderid = parseInt(String(req.params.id));
        const userId = (req as any).user.id;
        const userRole = (req as any).user.role;

        const order = await OrderController.orderRepository.findOne({
             where:{id: orderid},
             relations: ["user", "orderitem", "orderitem.product"]});
        if (!order) return res.status(403).json({message:"Order not found"});

        if (order.user.id !== userId && userRole !== 'admin') {
            return res.status(403).json({message:"Unauthorized"});
        }
        return res.json(order);
 }

static async cancelorder(req:Request, res:Response)
{
  const userId = (req as any).user.id;
  const orderId = parseInt(String(req.params.id));

      const order = await OrderController.orderRepository.findOne({
    where:{id: orderId},
  })
  if (!order)
  {
    return res.status(404).json({error:"Order not found"})
  }
  await OrderController.orderRepository.update(order.id, {orderstatus: OrderStatus.CANCELLED} );
  return res.json({message: "Order Cancelled Sucessfully"})
}
 }

