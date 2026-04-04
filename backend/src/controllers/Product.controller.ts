import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data.source";
import { PRODUCT } from "../entities/Product";
import { Between } from "typeorm";

export class ProductController {
    private static productRepository = AppDataSource.getRepository(PRODUCT);

    static async getProducts(req: Request, res: Response) {
     
        const { page = 1, limit = 12, minPrice, maxPrice, subCategoryId, categoryId, typeId } = req.query;

        const skip = (Number(page) - 1) * Number(limit);
        const queryOptions: any = {
            where: {},
            relations: ["subCategory", "subCategory.category", "subCategory.category.type"],
            skip: skip,
            take: Number(limit),
            order: { id: 'DESC' }
        };

        if (minPrice && maxPrice) {
            queryOptions.where.price = Between(Number(minPrice), Number(maxPrice));
        }

        if (subCategoryId) {
            queryOptions.where.subCategory = { id: Number(subCategoryId) };
        } else if (categoryId) {
            queryOptions.where.subCategory = { category: { id: Number(categoryId) } };
        } else if (typeId) {
            queryOptions.where.subCategory = { category: { type: { id: Number(typeId) } } };
        }

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
        const { keyword } = req.query;
        if (!keyword) return res.status(400).json({ message: "Keyword is required" });

        const searchKeyword = `%${keyword}%`;

        const products = await ProductController.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.subCategory", "subCategory")
            .leftJoinAndSelect("subCategory.category", "category")
            .leftJoinAndSelect("category.type", "type")
            .where("product.name LIKE :kw", { kw: searchKeyword })
            .orWhere("product.description LIKE :kw", { kw: searchKeyword })
            .orWhere("subCategory.subCategoryName LIKE :kw", { kw: searchKeyword })
            .orWhere("category.categoryName LIKE :kw", { kw: searchKeyword })
            .orWhere("type.typeName LIKE :kw", { kw: searchKeyword })
            .getMany();

        res.json(products);
    }

    static async getProductById(req: Request, res: Response) {
        const id = parseInt(String(req.params.id));
        
        const product = await ProductController.productRepository.findOne({
            where: { id },
            relations: ["subCategory", "subCategory.category", "subCategory.category.type"]
        });

        // This is a LOGIC error, so we handle it with a specific status code
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    }
}