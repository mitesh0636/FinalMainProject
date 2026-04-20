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
import path from "path";
dotenv.config();

// export const AppDataSource = new DataSource({
//     type: "sqlite",
//     database: process.env.DB_PATH || "database.sqlite",
//     synchronize: false,
//     logging: false,
//     // entities: [User, CART, CARTITEM, CATEGORY, ORDER, ORDERITEM, PRODUCT, PRODUCTTYPE, SUBCATEGORY],
//     entities: [__dirname + '/entities/*.{js,ts}'],
//     migrations: ["src/migrations/*.ts"],
//     subscribers: [],
// });
export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DB_PATH || "database.sqlite",
    synchronize: false,
    logging: false,
    // Use the actual classes you imported at the top
    entities: [
        User,
        CART,
        CARTITEM,
        CATEGORY,
        ORDER,
        ORDERITEM,
        PRODUCT,
        PRODUCTTYPE,
        SUBCATEGORY
    ],
    // For migrations in production, point to the compiled JS files
    migrations: [path.join(__dirname, "migrations", "*.js")],
    subscribers: [],
});