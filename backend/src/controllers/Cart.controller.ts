import { Request, Response } from "express";
import { AppDataSource } from "../data.source";
import { CART } from "../entities/Cart";
import { CARTITEM } from "../entities/Cartitem";
import { PRODUCT } from "../entities/Product";
import { User } from "../entities/User";

export class CartController {
    private static cartRepository = AppDataSource.getRepository(CART);
    private static cartItemRepository = AppDataSource.getRepository(CARTITEM)
    private static productRepository = AppDataSource.getRepository(PRODUCT);

    static async getOrCreateCart(req: Request, res:Response){
    const userId = (req as any).user.id;
    let cart = await CartController.cartRepository.findOne({
        where: {user : {id: userId} },
        relations:["cartITEM", "cartITEM.productc"]
    });

    if (!cart) {
        cart = CartController.cartRepository.create({user : {id: userId}, cartITEM:[]});
        await CartController.cartRepository.save(cart);
            return res.json({message:"Cart created sucessfully"})
    }
    return res.json(cart);
    }

static async addToCart(req:Request, res:Response) {
        const {productId, quantity } = req.body;
        const userId = (req.user as User).id;

        if (!productId || !quantity ){
            return res.status(400).json({message: "Invalid product or quantity"});
        }

        let cart = await CartController.cartRepository.findOne({
        where: {user : {id: userId} },
        relations:["cartITEM", "cartITEM.productc"]
    });
        const product = await CartController.productRepository.findOneBy({ id: productId});

        if (!product) return res.status(404).json({message:"Product not found"})

        if (product.isDeleted) return res.status(400).json({message:"Invalid Product"})

        if (cart)
        {
        let item = cart.cartITEM.find(i => i.productc.id === productId);
        if (item) {
            item.quantity += Number(quantity);
            await CartController.cartItemRepository.save(item);
        } else {
            item = CartController.cartItemRepository.create({
                cart: cart,
                productc: product,
                quantity : Number(quantity)
            });
            await CartController.cartItemRepository.save(item);
        }
    }
        return res.json({message: "Cart updated sucessfully"});
    }

static async updateQuantity(req:Request, res:Response) {

    const itemId = parseInt(String(req.params.id));
    console.log(itemId);
    const { quantity } = req.body;

    if (quantity <= 0)
    {
        await CartController.cartItemRepository.delete(itemId);
        return res.json({message :"Item removed from cart"});
}

await CartController.cartItemRepository.update(itemId, {quantity: quantity});

return res.json({message:"Quantity updated"});

}

static async removeItem(req:Request, res:Response) {
        const itemId = parseInt(String(req.params.id));
        await CartController.cartItemRepository.delete(itemId);
        return res.json({message : "Item removed"})
}

static async clearCart(req: Request, res: Response)
{
        const userId = (req.user as User).id;
        const cart = await CartController.cartRepository.findOne({
            where: { user: { id: userId}},
            relations:["cartITEM"]
        });

        if (cart && cart.cartITEM.length > 0)
        {
            await CartController.cartItemRepository.remove(cart.cartITEM);
        }
        return res.json({message:"Cart cleared"});
}




}
