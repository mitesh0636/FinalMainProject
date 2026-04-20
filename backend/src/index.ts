import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport";
import adminrouter from "./routes/admin.routes";
import authrouter from "./routes/auth.routes";
import cartrouter from "./routes/cart.routes";
import orderrouter from "./routes/order.routes";
import productrouter from "./routes/product.routes";
import { AppDataSource } from "./data.source";
import cors from 'cors';
import path from "node:path";
import fs from "fs";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/ProductImages', express.static(path.join(__dirname, '../ProductImages')));


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authrouter);
app.use("/api/cart", cartrouter);
app.use("/api/order", orderrouter);
app.use("/api/product", productrouter);
app.use("/api/admin", adminrouter);


app.use('/api/ProductImages', express.static(path.join(__dirname, '../ProductImages')));

const angularDistRoot = path.join(
  __dirname,
  "../../frontend/dist/frontend",
);
const projectRoot = path.resolve(__dirname, '..');
const frontendPath = path.join(projectRoot, 'dist', 'public', 'frontend', 'browser');

app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');

  // Safety check: if file doesn't exist, don't try to send it
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`Frontend build not found at " ${indexPath}, Project root: ${projectRoot}`);
  }
});



app.use(globalErrorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  })
  .catch((error) => console.log("TypeORM connection error: ", error));