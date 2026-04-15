import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import dotenv from "dotenv";
import { CART } from "./entities/Cart";
import { CARTITEM } from "./entities/Cartitem";
import { CATEGORY } from "./entities/Category";
import { ORDER } from "./entities/Order";
import { ORDERITEM } from "./entities/OrderItem";
import { PRODUCT } from "./entities/Product";
import { PRODUCTTYPE } from "./entities/Producttype";
import { SUBCATEGORY } from "./entities/SubCategory";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DB_PATH || "database.sqlite",
    synchronize: false, 
    logging: false,
    entities: [User, CART, CARTITEM, CATEGORY, ORDER, ORDERITEM, PRODUCT, PRODUCTTYPE, SUBCATEGORY],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});