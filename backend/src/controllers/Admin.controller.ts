import { Request, Response } from "express";
import { AppDataSource } from "../data.source";
import { ORDER } from "../entities/Order";
import { PRODUCT } from "../entities/Product";
import { User } from "../entities/User";
import { Admin, ResumeOptions } from "typeorm";
import * as fs from "fs";
import * as path from "path"
import { PRODUCTTYPE } from "../entities/Producttype";
import { CATEGORY } from "../entities/Category";
import { SUBCATEGORY } from "../entities/SubCategory";


export class AdminController {
    private static userRepository = AppDataSource.getRepository(User);
    private static productRepository = AppDataSource.getRepository(PRODUCT);
    private static orderRepository  = AppDataSource.getRepository(ORDER);
    private static producttypeRepository = AppDataSource.getRepository(PRODUCTTYPE);
    private static categoryRepository = AppDataSource.getRepository(CATEGORY);
    private static subcategoryRepository = AppDataSource.getRepository(SUBCATEGORY);
 
    static async getAllCustomers(req: Request, res:Response) {
            const customers = await AdminController.userRepository.find({
                select:["id", "name", "email", "role", "isLocked", "createdAt"],
                where: { role:"user" as any }
            });
            return res.json(customers);
    }


    static async createproducttype(req: Request, res:Response)
    {
        const { typename } = req.body;

        if (await AdminController.producttypeRepository.findOneBy({typename})){
            return res.status(409).json({error: "Producttype already exists"})
        }
        const producttypes = await AdminController.producttypeRepository.create({
            typename: typename
        })

        await AdminController.producttypeRepository.save(producttypes);
        return res.json(producttypes);
    }

    static async createCategory(req: Request, res:Response)
    {
        const producttypeid = parseInt(String(req.params.id));
        const { categoryname } = req.body;
        
        const producttype = await AdminController.producttypeRepository.findOneBy({id: producttypeid});

        if (!producttype)
            return res.status(404).json({message:"Product type not found"});

        if (await AdminController.categoryRepository.findOneBy({categoryname}))
        {
            return res.status(409).json({error : "Category type already exixts"});
        }
        const category = await AdminController.categoryRepository.create({
            categoryname,
            producttype: { id: Number(producttypeid) },
        });  

        await AdminController.categoryRepository.save(category);
        return res.json(category);
    }


    static async createSubCategory(req: Request, res:Response){
         const categoryid = parseInt(String(req.params.id));
         const { subcategoryname } = req.body;

         const categorytype = await AdminController.categoryRepository.findOneBy({id: categoryid});

         if (!categorytype) 
            return res.status(404).json({error: "Category not found"})

        if (await AdminController.subcategoryRepository.findOneBy({subcategoryname})){
            return res.status(409).json({error:"SubCategory already exists"});
        }

        const subcategory = await AdminController.subcategoryRepository.create({
            subcategoryname,
            category:{id: Number(categoryid)}
        });

        await AdminController.subcategoryRepository.save(subcategory);
        return res.json(subcategory)
    }


    static async toggleLock(req:Request, res:Response)
    {
            const userId = parseInt(String(req.params.id));
            const { isLocked } = req.body;
            const user = await AdminController.userRepository.findOneBy({ id: userId});
            if (!user) return res.status(404).json({message:"User not found"});

            user.isLocked = isLocked;
            await AdminController.userRepository.save(user);

            return res.json({message: `User ${isLocked ? 'locked' : 'unlocked'} sucessfully`});

    }

    static async createProduct(req: Request, res: Response)
    {
            const {name, description, price, available, subCategoryId } = req.body;
           const imagePath = (req as any).file ? `ProductImages/${(req as any).file.filename}` : undefined;

            const product = AdminController.productRepository.create({
                name,
                description,
                price: Number(price),
                available,
                SubCategory: { id: Number(subCategoryId) },
                imagePath: imagePath
            });

            await AdminController.productRepository.save(product);
            return res.status(201).json(product);
        }


    static async updateProduct(req: Request, res:Response)
    {
            const productId = parseInt(String(req.params.id));
            const updateData = req.body;

            const product = await AdminController.productRepository.findOneBy({ id: productId});
            if (!product) return res.status(404).json({message: "Product not found"});

            if ((req as any).file && product.imagePath) {
                const oldPath = path.join(__dirname, "../../", product.imagePath);
                if (fs.existsSync(oldPath))fs.unlinkSync(oldPath);

                updateData.imagePath = `ProductImages/${(req as any).file.filename}`;
            }

            Object.assign(product, updateData);
            await AdminController.productRepository.save(product);

            return res.json(product);
    }



static async deleteProduct(req: Request, res:Response) {
        const productId = parseInt(String(req.params.id));
        
        const product = await AdminController.productRepository.findOneBy({id:productId});
        if (!product) return res.status(404).json({message:'Product not found'});


        await AdminController.productRepository.delete(productId);
        return res.json({message:"Product deleted"});

}


static async getAllOrders(req: Request,res: Response)
{
        const orders = await AdminController.orderRepository.find({
            relations: ["user", "orderitem", "orderitem.product"],
            order:{ orderDate : 'DESC' }
        });
        return res.json(orders);
    }
}



    