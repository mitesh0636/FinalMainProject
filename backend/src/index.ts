import express from "express";
import cookieParser from "cookie-parser"; // 1. Import cookie-parser
import passport from "passport"; // 2. Import passport
import "./passport"; // 3. Import your passport config file to execute it
import adminrouter from "./routes/admin.routes";
import authrouter from "./routes/auth.routes";
import cartrouter from "./routes/cart.routes";
import orderrouter from "./routes/order.routes";
import productrouter from "./routes/product.routes";
import { AppDataSource } from "./data.source";

const app = express();

// --- MIDDLEWARE STACK ---
app.use(express.json());
app.use(cookieParser()); // 4. Mandatory for your cookieExtractor to work
app.use(passport.initialize()); // 5. Required for passport.authenticate to work

// --- ROUTES ---
app.use("/auth", authrouter);
app.use("/cart", cartrouter);
app.use("/order", orderrouter);
app.use("/product", productrouter);
app.use("/admin", adminrouter);

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => console.log("Server running on http://localhost:3000"));
    })
    .catch((error) => console.log("TypeORM connection error: ", error));