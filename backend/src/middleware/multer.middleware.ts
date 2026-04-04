import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the directory exists
const uploadDir = "ProductImages";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save to ProductImages/ folder
    },
    filename: (req, file, cb) => {
        // Create a unique filename: timestamp-originalname
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB
});