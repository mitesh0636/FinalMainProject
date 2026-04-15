import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data.source";
import { PRODUCT } from "../entities/Product";
import { Between, Brackets } from "typeorm";

export class ProductController {
    private static productRepository = AppDataSource.getRepository(PRODUCT);

    static async getProducts(req: Request, res: Response) {
     
        const { page = 1, limit = 12, minPrice, maxPrice, subCategoryId, categoryId, typeId } = req.query;

        const skip = (Number(page) - 1) * Number(limit);
        const queryOptions: any = {
            where: { isDeleted: false},
            relations: ["SubCategory", "SubCategory.category", "SubCategory.category.producttype"],
            skip: skip,
            take: Number(limit),
            order: { id: 'ASC' }
        };

        // if (minPrice && maxPrice) {
        //     queryOptions.where.price = Between(Number(minPrice), Number(maxPrice));
        // }

        // if (subCategoryId) {
        //     queryOptions.where.SubCategory = { id: Number(subCategoryId) };
        // } else if (categoryId) {
        //     queryOptions.where.SubCategory = { category: { id: Number(categoryId) } };
        // } else if (typeId) {
        //     queryOptions.where.SubCategory = { category: { type: { id: Number(typeId) } } };
        // }

        const [products, total] = await ProductController.productRepository.findAndCount(queryOptions);

        res.json({
            data: products,
            meta: {
                total,
                page: Number(page),
                lastPage: Math.ceil(total / Number(limit))
            }
        });
    }

static async search(req: Request, res: Response) {
    const { keyword, minPrice, maxPrice } = req.query;

    const searchKeyword = keyword ? `%${keyword}%` : '%%';

    const query = ProductController.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.SubCategory", "SubCategory")
        .leftJoinAndSelect("SubCategory.category", "category")
        .leftJoinAndSelect("category.producttype", "producttype")
        .where("product.isDeleted = :isDeleted", { isDeleted: false });

    if (keyword) {
        query.andWhere(new Brackets(qb => {
            qb.where("product.name LIKE :kw", { kw: searchKeyword })
              .orWhere("product.description LIKE :kw", { kw: searchKeyword })
              .orWhere("SubCategory.subcategoryname LIKE :kw", { kw: searchKeyword })
              .orWhere("category.categoryname LIKE :kw", { kw: searchKeyword })
              .orWhere("producttype.typename LIKE :kw", { kw: searchKeyword });
        }));
    }


    if (minPrice !== undefined && minPrice !== '') {
        query.andWhere("product.price >= :min", { min: Number(minPrice) });
    }

    if (maxPrice !== undefined && maxPrice !== '') {
        query.andWhere("product.price <= :max", { max: Number(maxPrice) });
    }

    const products = await query.getMany();

    res.json({
        data: products,
        meta: {
            total: products.length,
            page: 1,
            lastPage: 1 
        }
    });
}

    static async getProductById(req: Request, res: Response) {
        const id = parseInt(String(req.params.id));
        
        const product = await ProductController.productRepository.findOne({
            where: { id, isDeleted: false },
            relations: ["SubCategory", "SubCategory.category", "SubCategory.category.producttype"]
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.isDeleted){
            return res.status(409).json({error: "Product Invalid"})
        }

        res.json(product);
    }
}