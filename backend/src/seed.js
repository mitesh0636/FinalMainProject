"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const bcrypt = __importStar(require("bcrypt"));
const data_source_1 = require("./data.source");
const User_1 = require("./entities/User");
const Producttype_1 = require("./entities/Producttype");
const Category_1 = require("./entities/Category");
const SubCategory_1 = require("./entities/SubCategory");
const Product_1 = require("./entities/Product");
const Cart_1 = require("./entities/Cart");
const Cartitem_1 = require("./entities/Cartitem");
const Order_1 = require("./entities/Order");
const OrderItem_1 = require("./entities/OrderItem");
async function seed() {
    await data_source_1.AppDataSource.initialize();
    console.log("✅ Database connected.");
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        // ─── Clear existing data (order matters due to FK constraints) ───
        await queryRunner.query(`DELETE FROM "ORDERITEM"`);
        await queryRunner.query(`DELETE FROM "ORDER"`);
        await queryRunner.query(`DELETE FROM "CARTITEM"`);
        await queryRunner.query(`DELETE FROM "CART"`);
        await queryRunner.query(`DELETE FROM "PRODUCT"`);
        await queryRunner.query(`DELETE FROM "SUBCATEGORY"`);
        await queryRunner.query(`DELETE FROM "CATEGORY"`);
        await queryRunner.query(`DELETE FROM "PRODUCTTYPE"`);
        await queryRunner.query(`DELETE FROM "USERS"`);
        console.log("🧹 Existing data cleared.");
        // ─── Repos ───
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const typeRepo = data_source_1.AppDataSource.getRepository(Producttype_1.PRODUCTTYPE);
        const categoryRepo = data_source_1.AppDataSource.getRepository(Category_1.CATEGORY);
        const subcategoryRepo = data_source_1.AppDataSource.getRepository(SubCategory_1.SUBCATEGORY);
        const productRepo = data_source_1.AppDataSource.getRepository(Product_1.PRODUCT);
        const cartRepo = data_source_1.AppDataSource.getRepository(Cart_1.CART);
        const cartItemRepo = data_source_1.AppDataSource.getRepository(Cartitem_1.CARTITEM);
        const orderRepo = data_source_1.AppDataSource.getRepository(Order_1.ORDER);
        const orderItemRepo = data_source_1.AppDataSource.getRepository(OrderItem_1.ORDERITEM);
        // ════════════════════════════════════════════
        // 1. PRODUCT TYPES
        // ════════════════════════════════════════════
        const typeNames = ["Electronics", "Fashion", "Home & Kitchen", "Sports & Outdoors", "Books & Stationery"];
        const productTypes = [];
        for (const typename of typeNames) {
            const pt = typeRepo.create({ typename });
            productTypes.push(await typeRepo.save(pt));
        }
        console.log(`✅ Created ${productTypes.length} product types.`);
        // ════════════════════════════════════════════
        // 2. CATEGORIES (2-3 per type)
        // ════════════════════════════════════════════
        const categoryData = [
            // Electronics (0)
            { categoryname: "Mobile & Tablets", typeIndex: 0 },
            { categoryname: "Computers & Laptops", typeIndex: 0 },
            { categoryname: "Audio & Headphones", typeIndex: 0 },
            // Fashion (1)
            { categoryname: "Men's Clothing", typeIndex: 1 },
            { categoryname: "Women's Clothing", typeIndex: 1 },
            { categoryname: "Footwear", typeIndex: 1 },
            // Home & Kitchen (2)
            { categoryname: "Cookware", typeIndex: 2 },
            { categoryname: "Furniture", typeIndex: 2 },
            // Sports (3)
            { categoryname: "Fitness Equipment", typeIndex: 3 },
            { categoryname: "Outdoor Gear", typeIndex: 3 },
            // Books (4)
            { categoryname: "Fiction", typeIndex: 4 },
            { categoryname: "Technology & Coding", typeIndex: 4 },
        ];
        const categories = [];
        for (const cd of categoryData) {
            const cat = categoryRepo.create({ categoryname: cd.categoryname, producttype: productTypes[cd.typeIndex] });
            categories.push(await categoryRepo.save(cat));
        }
        console.log(`✅ Created ${categories.length} categories.`);
        // ════════════════════════════════════════════
        // 3. SUBCATEGORIES (2 per category)
        // ════════════════════════════════════════════
        const subcategoryData = [
            // Mobile & Tablets (0)
            { subcategoryname: "Smartphones", catIndex: 0 },
            { subcategoryname: "Tablets", catIndex: 0 },
            // Computers & Laptops (1)
            { subcategoryname: "Gaming Laptops", catIndex: 1 },
            { subcategoryname: "Ultrabooks", catIndex: 1 },
            // Audio (2)
            { subcategoryname: "Over-Ear Headphones", catIndex: 2 },
            { subcategoryname: "True Wireless Earbuds", catIndex: 2 },
            // Men's Clothing (3)
            { subcategoryname: "T-Shirts & Polos", catIndex: 3 },
            { subcategoryname: "Jeans & Trousers", catIndex: 3 },
            // Women's Clothing (4)
            { subcategoryname: "Dresses & Kurtis", catIndex: 4 },
            { subcategoryname: "Tops & Blouses", catIndex: 4 },
            // Footwear (5)
            { subcategoryname: "Sneakers", catIndex: 5 },
            { subcategoryname: "Formal Shoes", catIndex: 5 },
            // Cookware (6)
            { subcategoryname: "Non-stick Pans", catIndex: 6 },
            { subcategoryname: "Pressure Cookers", catIndex: 6 },
            // Furniture (7)
            { subcategoryname: "Study Desks", catIndex: 7 },
            { subcategoryname: "Office Chairs", catIndex: 7 },
            // Fitness Equipment (8)
            { subcategoryname: "Dumbbells & Weights", catIndex: 8 },
            { subcategoryname: "Yoga & Pilates", catIndex: 8 },
            // Outdoor Gear (9)
            { subcategoryname: "Camping", catIndex: 9 },
            { subcategoryname: "Cycling", catIndex: 9 },
            // Fiction (10)
            { subcategoryname: "Literary Fiction", catIndex: 10 },
            { subcategoryname: "Science Fiction", catIndex: 10 },
            // Technology & Coding (11)
            { subcategoryname: "Web Development", catIndex: 11 },
            { subcategoryname: "Data Science & AI", catIndex: 11 },
        ];
        const subcategories = [];
        for (const sd of subcategoryData) {
            const sub = subcategoryRepo.create({ subcategoryname: sd.subcategoryname, category: categories[sd.catIndex] });
            subcategories.push(await subcategoryRepo.save(sub));
        }
        console.log(`✅ Created ${subcategories.length} subcategories.`);
        const productData = [
            // Smartphones (subIndex 0)
            { name: "Samsung Galaxy S25 Ultra", description: "Top-of-the-line Samsung flagship with 200MP camera and S Pen.", price: 109999, available: 30, imagePath: "uploads/galaxy-s25-ultra.jpg", subIndex: 0 },
            { name: "iPhone 16 Pro Max", description: "Apple's latest pro phone with A18 Pro chip and titanium build.", price: 134900, available: 25, imagePath: "uploads/iphone-16-pro.jpg", subIndex: 0 },
            { name: "OnePlus 13", description: "Hasselblad tuned cameras, Snapdragon 8 Elite, 100W charging.", price: 69999, available: 40, imagePath: "uploads/oneplus-13.jpg", subIndex: 0 },
            { name: "Google Pixel 9 Pro", description: "Pure Android experience with Google AI photography.", price: 99999, available: 20, imagePath: "uploads/pixel-9-pro.jpg", subIndex: 0 },
            // Tablets (subIndex 1)
            { name: "iPad Pro 13-inch M4", description: "Ultra Retina XDR display, M4 chip, Apple Pencil Pro support.", price: 109900, available: 15, imagePath: "uploads/ipad-pro-m4.jpg", subIndex: 1 },
            { name: "Samsung Galaxy Tab S9 FE", description: "Large display tablet with S Pen, great for creativity.", price: 44999, available: 22, imagePath: "uploads/tab-s9-fe.jpg", subIndex: 1 },
            // Gaming Laptops (subIndex 2)
            { name: "ASUS ROG Strix G16 2025", description: "RTX 4070, Intel Core i9, 16GB RAM, 240Hz display.", price: 159990, available: 10, imagePath: "uploads/rog-strix-g16.jpg", subIndex: 2 },
            { name: "MSI Titan GT77 HX", description: "Desktop-grade RTX 4090, 64GB DDR5, 4K 144Hz display.", price: 349990, available: 5, imagePath: "uploads/msi-titan.jpg", subIndex: 2 },
            { name: "Lenovo Legion 5i Pro", description: "RTX 4060, Core i7, 165Hz IPS display, Lenovo Legion AI.", price: 119990, available: 18, imagePath: "uploads/legion-5i-pro.jpg", subIndex: 2 },
            // Ultrabooks (subIndex 3)
            { name: "MacBook Air 15 M3", description: "Fanless, 18-hr battery, stunning Liquid Retina display.", price: 134900, available: 20, imagePath: "uploads/macbook-air-m3.jpg", subIndex: 3 },
            { name: "Dell XPS 15 OLED", description: "3.5K OLED, Core Ultra 9, 32GB RAM, premium build.", price: 189990, available: 8, imagePath: "uploads/dell-xps-15.jpg", subIndex: 3 },
            // Over-Ear Headphones (subIndex 4)
            { name: "Sony WH-1000XM6", description: "Industry-leading noise cancellation, 30-hr battery.", price: 29990, available: 50, imagePath: "uploads/sony-xm6.jpg", subIndex: 4 },
            { name: "Bose QuietComfort 45", description: "Premium comfort, excellent ANC, balanced sound.", price: 24990, available: 35, imagePath: "uploads/bose-qc45.jpg", subIndex: 4 },
            // TWS Earbuds (subIndex 5)
            { name: "Apple AirPods Pro 2nd Gen", description: "H2 chip, adaptive transparency, USB-C charging.", price: 24900, available: 60, imagePath: "uploads/airpods-pro-2.jpg", subIndex: 5 },
            { name: "Nothing Ear (2)", description: "Dual driver, LHDC 5.0, transparent design.", price: 8999, available: 45, imagePath: "uploads/nothing-ear-2.jpg", subIndex: 5 },
            { name: "Samsung Galaxy Buds3 Pro", description: "ANC, 360 Audio, ergonomic blade design.", price: 17999, available: 40, imagePath: "uploads/galaxy-buds3-pro.jpg", subIndex: 5 },
            // T-Shirts & Polos (subIndex 6)
            { name: "Puma Essential Logo Tee", description: "100% cotton, relaxed fit, available in 6 colors.", price: 899, available: 150, imagePath: "uploads/puma-tee.jpg", subIndex: 6 },
            { name: "Allen Solly Polo Shirt", description: "Classic polo, pique fabric, slim fit, professional look.", price: 1299, available: 80, imagePath: "uploads/allen-solly-polo.jpg", subIndex: 6 },
            // Jeans & Trousers (subIndex 7)
            { name: "Levi's 511 Slim Fit Jeans", description: "Mid-rise, slim through hip and thigh, stretch denim.", price: 3499, available: 70, imagePath: "uploads/levis-511.jpg", subIndex: 7 },
            { name: "Peter England Chinos", description: "Cotton blend, mid-rise, relaxed taper chinos.", price: 1799, available: 90, imagePath: "uploads/pe-chinos.jpg", subIndex: 7 },
            // Dresses & Kurtis (subIndex 8)
            { name: "Biba Printed Anarkali Kurti", description: "Rayon fabric, printed, full-length flared design.", price: 1999, available: 60, imagePath: "uploads/biba-kurti.jpg", subIndex: 8 },
            { name: "W Shirt Collar Dress", description: "Cotton blend, knee-length A-line dress, casual wear.", price: 2499, available: 45, imagePath: "uploads/w-dress.jpg", subIndex: 8 },
            // Tops & Blouses (subIndex 9)
            { name: "Mango Draped Satin Top", description: "Satin finish, draped neckline, easy elegant look.", price: 2999, available: 55, imagePath: "uploads/mango-satin-top.jpg", subIndex: 9 },
            { name: "H&M Ribbed Crop Top", description: "Stretchy rib knit fabric, cropped fit, versatile styling.", price: 799, available: 110, imagePath: "uploads/hm-crop-top.jpg", subIndex: 9 },
            // Sneakers (subIndex 10)
            { name: "Nike Air Max 270", description: "Max Air heel unit, lightweight mesh upper, street style.", price: 11995, available: 60, imagePath: "uploads/nike-airmax-270.jpg", subIndex: 10 },
            { name: "Adidas Ultraboost 22", description: "Boost midsole, Primeknit upper, superior cushioning.", price: 14999, available: 50, imagePath: "uploads/adidas-ultraboost.jpg", subIndex: 10 },
            { name: "New Balance 574", description: "Retro chunky sole, suede & mesh, classic colorways.", price: 8999, available: 40, imagePath: "uploads/nb-574.jpg", subIndex: 10 },
            // Formal Shoes (subIndex 11)
            { name: "Clarks Desert Boot", description: "Iconic suede boot, crepe sole, unisex classic.", price: 9999, available: 30, imagePath: "uploads/clarks-desert.jpg", subIndex: 11 },
            // Non-stick Pans (subIndex 12)
            { name: "Hawkins Futura Non-stick Kadai 3L", description: "Hard anodized aluminium, non-stick, induction compatible.", price: 1599, available: 40, imagePath: "uploads/hawkins-kadai.jpg", subIndex: 12 },
            { name: "Prestige Omega Non-stick Frypan", description: "5-layer coating, stay-cool handles, 240mm.", price: 999, available: 55, imagePath: "uploads/prestige-frypan.jpg", subIndex: 12 },
            // Pressure Cookers (subIndex 13)
            { name: "Hawkins Contura 5L Cooker", description: "Stainless steel, whistle control, ISI marked.", price: 2899, available: 30, imagePath: "uploads/hawkins-cooker.jpg", subIndex: 13 },
            { name: "Instapot Duo 7-in-1", description: "Electric pressure cooker, slow cook, air fry, yogurt mode.", price: 8999, available: 20, imagePath: "uploads/instapot-duo.jpg", subIndex: 13 },
            // Study Desks (subIndex 14)
            { name: "Nilkamal Apex Study Table", description: "Engineered wood, 4 shelves, scratch-resistant top.", price: 5999, available: 15, imagePath: "uploads/nilkamal-desk.jpg", subIndex: 14 },
            // Office Chairs (subIndex 15)
            { name: "Green Soul Jupiter Pro", description: "Mesh back, lumbar support, adjustable armrests & height.", price: 11999, available: 12, imagePath: "uploads/greensoul-chair.jpg", subIndex: 15 },
            { name: "Featherlite Libra Chair", description: "Ergonomic mesh, synchro tilt, certified for 8-hr use.", price: 16999, available: 8, imagePath: "uploads/featherlite-chair.jpg", subIndex: 15 },
            // Dumbbells & Weights (subIndex 16)
            { name: "Kore PVC 20kg Dumbbell Set", description: "PVC coated plates, chrome bars, beginner-friendly set.", price: 2199, available: 50, imagePath: "uploads/kore-dumbbells.jpg", subIndex: 16 },
            { name: "Fitkit Hex Rubber Dumbbell 10kg (pair)", description: "Hex-shaped, rubber encased, anti-roll.", price: 1899, available: 35, imagePath: "uploads/fitkit-hex.jpg", subIndex: 16 },
            // Yoga & Pilates (subIndex 17)
            { name: "Boldfit Yoga Mat 6mm", description: "TPE anti-slip, eco-friendly, carrying strap included.", price: 699, available: 100, imagePath: "uploads/boldfit-mat.jpg", subIndex: 17 },
            { name: "Strauss Resistance Bands Set", description: "Set of 5 bands, door anchor & ankle strap included.", price: 599, available: 90, imagePath: "uploads/strauss-bands.jpg", subIndex: 17 },
            // Camping (subIndex 18)
            { name: "Quechua 2-Person Tent", description: "2-second pitch, waterproof 1500mm, 3-season tent.", price: 5999, available: 20, imagePath: "uploads/quechua-tent.jpg", subIndex: 18 },
            // Cycling (subIndex 19)
            { name: "Firefox Bolt 26T MTB", description: "21-speed Shimano, front suspension, alloy frame.", price: 12999, available: 10, imagePath: "uploads/firefox-bolt.jpg", subIndex: 19 },
            // Literary Fiction (subIndex 20)
            { name: "The God of Small Things – Arundhati Roy", description: "Man Booker Prize winner, set in Kerala.", price: 499, available: 200, imagePath: "uploads/god-small-things.jpg", subIndex: 20 },
            { name: "The White Tiger – Aravind Adiga", description: "Booker Prize 2008, dark comedy about India.", price: 399, available: 150, imagePath: "uploads/white-tiger.jpg", subIndex: 20 },
            // Science Fiction (subIndex 21)
            { name: "Project Hail Mary – Andy Weir", description: "Lone astronaut, impossible mission, brilliant hard sci-fi.", price: 549, available: 120, imagePath: "uploads/project-hail-mary.jpg", subIndex: 21 },
            // Web Development (subIndex 22)
            { name: "You Don't Know JS Yet (2nd Ed)", description: "Deep dive into JavaScript core mechanics.", price: 999, available: 80, imagePath: "uploads/ydkjs.jpg", subIndex: 22 },
            { name: "Node.js Design Patterns 3rd Ed", description: "Scalable Node.js patterns for production apps.", price: 1299, available: 60, imagePath: "uploads/nodejs-patterns.jpg", subIndex: 22 },
            // Data Science & AI (subIndex 23)
            { name: "Hands-On ML with Scikit-Learn & TF 3rd Ed", description: "Practical ML, deep learning, end-to-end projects.", price: 1799, available: 70, imagePath: "uploads/homl-tf.jpg", subIndex: 23 },
        ];
        const products = [];
        for (const pd of productData) {
            const prod = productRepo.create({
                name: pd.name,
                description: pd.description,
                price: pd.price,
                available: pd.available,
                imagePath: pd.imagePath,
                SubCategory: subcategories[pd.subIndex],
            });
            products.push(await productRepo.save(prod));
        }
        console.log(`✅ Created ${products.length} products.`);
        // ════════════════════════════════════════════
        // 5. USERS (20 users including 1 admin)
        // ════════════════════════════════════════════
        const hashedPassword = await bcrypt.hash("Test@1234", 10);
        const adminPassword = await bcrypt.hash("Admin@1234", 10);
        const userData = [
            { name: "Admin User", email: "admin@shopease.com", password: adminPassword, address: "1 Admin Lane, Mumbai", contactno: "9000000001", dateofbirth: new Date("1990-01-15"), role: User_1.Roleenum.ADMINROLE },
            { name: "Arjun Sharma", email: "arjun.sharma@gmail.com", password: hashedPassword, address: "12 MG Road, Bengaluru", contactno: "9876543210", dateofbirth: new Date("1995-06-12") },
            { name: "Priya Nair", email: "priya.nair@gmail.com", password: hashedPassword, address: "45 Anna Salai, Chennai", contactno: "9876543211", dateofbirth: new Date("1998-03-25") },
            { name: "Rahul Verma", email: "rahul.verma@gmail.com", password: hashedPassword, address: "7 Connaught Place, Delhi", contactno: "9876543212", dateofbirth: new Date("1993-11-08") },
            { name: "Sneha Patil", email: "sneha.patil@gmail.com", password: hashedPassword, address: "22 FC Road, Pune", contactno: "9876543213", dateofbirth: new Date("1997-07-30") },
            { name: "Vikram Joshi", email: "vikram.joshi@gmail.com", password: hashedPassword, address: "89 Park Street, Kolkata", contactno: "9876543214", dateofbirth: new Date("1992-09-14") },
            { name: "Anjali Mehta", email: "anjali.mehta@gmail.com", password: hashedPassword, address: "3 Bandra West, Mumbai", contactno: "9876543215", dateofbirth: new Date("1996-02-18") },
            { name: "Karan Singh", email: "karan.singh@gmail.com", password: hashedPassword, address: "55 Hazratganj, Lucknow", contactno: "9876543216", dateofbirth: new Date("1994-05-22") },
            { name: "Deepika Reddy", email: "deepika.reddy@gmail.com", password: hashedPassword, address: "10 Banjara Hills, Hyd", contactno: "9876543217", dateofbirth: new Date("1999-10-05") },
            { name: "Aditya Kumar", email: "aditya.kumar@gmail.com", password: hashedPassword, address: "34 Law Garden, Ahmedabad", contactno: "9876543218", dateofbirth: new Date("1991-12-31") },
            { name: "Meera Iyer", email: "meera.iyer@gmail.com", password: hashedPassword, address: "67 Koramangala, Bengaluru", contactno: "9876543219", dateofbirth: new Date("1997-04-17") },
            { name: "Rohit Bose", email: "rohit.bose@gmail.com", password: hashedPassword, address: "15 Salt Lake, Kolkata", contactno: "9876543220", dateofbirth: new Date("1990-08-23") },
            { name: "Pooja Chaudhary", email: "pooja.chaudhary@gmail.com", password: hashedPassword, address: "21 Civil Lines, Jaipur", contactno: "9876543221", dateofbirth: new Date("1995-01-09") },
            { name: "Nikhil Desai", email: "nikhil.desai@gmail.com", password: hashedPassword, address: "9 Kalyani Nagar, Pune", contactno: "9876543222", dateofbirth: new Date("1993-06-27") },
            { name: "Kavya Menon", email: "kavya.menon@gmail.com", password: hashedPassword, address: "4 Marine Drive, Kochi", contactno: "9876543223", dateofbirth: new Date("1998-09-13") },
            { name: "Siddharth Rao", email: "siddharth.rao@gmail.com", password: hashedPassword, address: "77 Indiranagar, Bengaluru", contactno: "9876543224", dateofbirth: new Date("1994-03-02") },
            { name: "Tanvi Shah", email: "tanvi.shah@gmail.com", password: hashedPassword, address: "38 Navrangpura, Ahmedabad", contactno: "9876543225", dateofbirth: new Date("1996-11-16") },
            { name: "Manish Tiwari", email: "manish.tiwari@gmail.com", password: hashedPassword, address: "6 Gomti Nagar, Lucknow", contactno: "9876543226", dateofbirth: new Date("1992-07-04") },
            { name: "Ishaan Kapoor", email: "ishaan.kapoor@gmail.com", password: hashedPassword, address: "19 Lajpat Nagar, Delhi", contactno: "9876543227", dateofbirth: new Date("2000-02-28") },
            { name: "Riya Ghosh", email: "riya.ghosh@gmail.com", password: hashedPassword, address: "50 Tollygunge, Kolkata", contactno: "9876543228", dateofbirth: new Date("1997-08-11") },
        ];
        const users = [];
        for (const ud of userData) {
            const u = userRepo.create({ ...ud, isLocked: false, role: ud.role ?? User_1.Roleenum.USERROLE });
            users.push(await userRepo.save(u));
        }
        console.log(`✅ Created ${users.length} users.`);
        // ════════════════════════════════════════════
        // 6. CARTS (for users index 1–19, i.e., non-admin)
        // ════════════════════════════════════════════
        const carts = [];
        for (let i = 1; i < users.length; i++) {
            const cart = cartRepo.create({ user: users[i] });
            carts.push(await cartRepo.save(cart));
        }
        console.log(`✅ Created ${carts.length} carts.`);
        // ════════════════════════════════════════════
        // 7. CART ITEMS (active carts for 10 users)
        // ════════════════════════════════════════════
        const activeCartSeeds = [
            { cartIndex: 0, productIndex: 0, quantity: 1 }, // Arjun: Galaxy S25 Ultra
            { cartIndex: 0, productIndex: 10, quantity: 1 }, // Arjun: Dell XPS 15
            { cartIndex: 1, productIndex: 13, quantity: 2 }, // Priya: Nothing Ear (2)
            { cartIndex: 1, productIndex: 21, quantity: 1 }, // Priya: Mango Satin Top
            { cartIndex: 2, productIndex: 4, quantity: 1 }, // Rahul: iPad Pro
            { cartIndex: 3, productIndex: 16, quantity: 3 }, // Sneha: Puma Tee
            { cartIndex: 3, productIndex: 22, quantity: 1 }, // Sneha: HM Crop Top
            { cartIndex: 4, productIndex: 6, quantity: 1 }, // Vikram: ROG Strix
            { cartIndex: 5, productIndex: 37, quantity: 1 }, // Anjali: Yoga Mat
            { cartIndex: 5, productIndex: 38, quantity: 1 }, // Anjali: Resistance Bands
            { cartIndex: 6, productIndex: 11, quantity: 1 }, // Karan: Sony XM6
            { cartIndex: 7, productIndex: 28, quantity: 1 }, // Deepika: Hawkins Kadai
            { cartIndex: 7, productIndex: 30, quantity: 1 }, // Deepika: Hawkins Cooker
            { cartIndex: 8, productIndex: 42, quantity: 2 }, // Aditya: God of Small Things
            { cartIndex: 9, productIndex: 2, quantity: 1 }, // Meera: OnePlus 13
        ];
        for (const ci of activeCartSeeds) {
            const item = cartItemRepo.create({
                cart: carts[ci.cartIndex],
                productc: products[ci.productIndex],
                quantity: ci.quantity,
            });
            await cartItemRepo.save(item);
        }
        console.log(`✅ Created ${activeCartSeeds.length} cart items.`);
        // ════════════════════════════════════════════
        // 8. ORDERS & ORDER ITEMS
        // ════════════════════════════════════════════
        function addDays(d, days) {
            const nd = new Date(d);
            nd.setDate(nd.getDate() + days);
            return nd;
        }
        const orderSeeds = [
            {
                userIndex: 1, paymentMethod: Order_1.PAYMENTMETHOD.CREDITCARD, status: Order_1.OrderStatus.DELIVERED, daysAgo: 30, deliveryDaysFromOrder: 5,
                items: [{ productIndex: 1, quantity: 1 }, { productIndex: 12, quantity: 1 }],
            },
            {
                userIndex: 2, paymentMethod: Order_1.PAYMENTMETHOD.DEBITCARD, status: Order_1.OrderStatus.DELIVERED, daysAgo: 20, deliveryDaysFromOrder: 4,
                items: [{ productIndex: 8, quantity: 1 }],
            },
            {
                userIndex: 3, paymentMethod: Order_1.PAYMENTMETHOD.CASHONDELIVERY, status: Order_1.OrderStatus.DELIVERED, daysAgo: 15, deliveryDaysFromOrder: 3,
                items: [{ productIndex: 16, quantity: 2 }, { productIndex: 18, quantity: 1 }],
            },
            {
                userIndex: 4, paymentMethod: Order_1.PAYMENTMETHOD.BANKTRANSFER, status: Order_1.OrderStatus.DISPATCHED, daysAgo: 3, deliveryDaysFromOrder: 5,
                items: [{ productIndex: 6, quantity: 1 }, { productIndex: 11, quantity: 1 }],
            },
            {
                userIndex: 5, paymentMethod: Order_1.PAYMENTMETHOD.CREDITCARD, status: Order_1.OrderStatus.ORDERED, daysAgo: 1, deliveryDaysFromOrder: 7,
                items: [{ productIndex: 33, quantity: 1 }],
            },
            {
                userIndex: 6, paymentMethod: Order_1.PAYMENTMETHOD.DEBITCARD, status: Order_1.OrderStatus.DELIVERED, daysAgo: 45, deliveryDaysFromOrder: 4,
                items: [{ productIndex: 23, quantity: 1 }, { productIndex: 24, quantity: 1 }, { productIndex: 26, quantity: 1 }],
            },
            {
                userIndex: 7, paymentMethod: Order_1.PAYMENTMETHOD.CASHONDELIVERY, status: Order_1.OrderStatus.DELIVERED, daysAgo: 10, deliveryDaysFromOrder: 3,
                items: [{ productIndex: 36, quantity: 1 }, { productIndex: 37, quantity: 2 }],
            },
            {
                userIndex: 8, paymentMethod: Order_1.PAYMENTMETHOD.CREDITCARD, status: Order_1.OrderStatus.CANCELLED, daysAgo: 7, deliveryDaysFromOrder: 6,
                items: [{ productIndex: 9, quantity: 1 }],
            },
            {
                userIndex: 9, paymentMethod: Order_1.PAYMENTMETHOD.BANKTRANSFER, status: Order_1.OrderStatus.DELIVERED, daysAgo: 60, deliveryDaysFromOrder: 5,
                items: [{ productIndex: 42, quantity: 3 }, { productIndex: 43, quantity: 2 }],
            },
            {
                userIndex: 10, paymentMethod: Order_1.PAYMENTMETHOD.DEBITCARD, status: Order_1.OrderStatus.DISPATCHED, daysAgo: 2, deliveryDaysFromOrder: 4,
                items: [{ productIndex: 3, quantity: 1 }, { productIndex: 13, quantity: 2 }],
            },
            {
                userIndex: 11, paymentMethod: Order_1.PAYMENTMETHOD.CASHONDELIVERY, status: Order_1.OrderStatus.DELIVERED, daysAgo: 25, deliveryDaysFromOrder: 5,
                items: [{ productIndex: 28, quantity: 1 }, { productIndex: 30, quantity: 1 }],
            },
            {
                userIndex: 12, paymentMethod: Order_1.PAYMENTMETHOD.CREDITCARD, status: Order_1.OrderStatus.ORDERED, daysAgo: 0, deliveryDaysFromOrder: 7,
                items: [{ productIndex: 4, quantity: 1 }],
            },
            {
                userIndex: 1, paymentMethod: Order_1.PAYMENTMETHOD.DEBITCARD, status: Order_1.OrderStatus.DELIVERED, daysAgo: 90, deliveryDaysFromOrder: 4,
                items: [{ productIndex: 44, quantity: 1 }, { productIndex: 45, quantity: 1 }],
            },
            {
                userIndex: 14, paymentMethod: Order_1.PAYMENTMETHOD.CREDITCARD, status: Order_1.OrderStatus.DISPATCHED, daysAgo: 2, deliveryDaysFromOrder: 5,
                items: [{ productIndex: 7, quantity: 1 }],
            },
            {
                userIndex: 15, paymentMethod: Order_1.PAYMENTMETHOD.BANKTRANSFER, status: Order_1.OrderStatus.DELIVERED, daysAgo: 12, deliveryDaysFromOrder: 3,
                items: [{ productIndex: 39, quantity: 1 }, { productIndex: 38, quantity: 1 }],
            },
        ];
        const TAX_RATE = 0.18;
        let totalOrders = 0;
        let totalOrderItems = 0;
        for (const os of orderSeeds) {
            const orderDate = addDays(new Date(), -os.daysAgo);
            const deliveryDate = addDays(orderDate, os.deliveryDaysFromOrder);
            // Calculate subtotal from product prices
            let subTotal = 0;
            for (const item of os.items) {
                subTotal += products[item.productIndex].price * item.quantity;
            }
            const taxApplied = parseFloat((subTotal * TAX_RATE).toFixed(2));
            const totalPayment = parseFloat((subTotal + taxApplied).toFixed(2));
            const order = orderRepo.create({
                user: users[os.userIndex],
                TotalPayment: totalPayment,
                TaxApplied: taxApplied,
                SubTotal: subTotal,
                orderDate,
                deliveryDate,
                orderstatus: os.status,
                paymentMethod: os.paymentMethod,
            });
            const savedOrder = await orderRepo.save(order);
            totalOrders++;
            for (const item of os.items) {
                const oi = orderItemRepo.create({
                    order: savedOrder,
                    product: products[item.productIndex],
                    quantity: item.quantity,
                    priceAtPurchase: products[item.productIndex].price,
                });
                await orderItemRepo.save(oi);
                totalOrderItems++;
            }
        }
        console.log(`✅ Created ${totalOrders} orders with ${totalOrderItems} order items.`);
        await queryRunner.commitTransaction();
        console.log("\n🎉 Seeding complete! Summary:");
        console.log(`   Product Types : ${productTypes.length}`);
        console.log(`   Categories    : ${categories.length}`);
        console.log(`   Subcategories : ${subcategories.length}`);
        console.log(`   Products      : ${products.length}`);
        console.log(`   Users         : ${users.length} (1 admin + 19 regular)`);
        console.log(`   Carts         : ${carts.length}`);
        console.log(`   Cart Items    : ${activeCartSeeds.length}`);
        console.log(`   Orders        : ${totalOrders}`);
        console.log(`   Order Items   : ${totalOrderItems}`);
        console.log("\n📌 Login credentials:");
        console.log("   Admin → admin@shopease.com   / Admin@1234");
        console.log("   Users → <email>              / Test@1234");
    }
    catch (err) {
        await queryRunner.rollbackTransaction();
        console.error("❌ Seeding failed, rolling back:", err);
        throw err;
    }
    finally {
        await queryRunner.release();
        await data_source_1.AppDataSource.destroy();
    }
}
seed().catch(console.error);
