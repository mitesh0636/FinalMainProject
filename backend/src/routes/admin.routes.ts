import { Router } from "express";
import { asyncHandler } from "../utils/asynchandler";
import { AdminController } from "../controllers/Admin.controller";
import { Admin } from "typeorm";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { upload } from "../middleware/multer.middleware";
import { updateOrderStatusMiddleware } from "../middleware/order.middleware";

const adminrouter = Router();

adminrouter.get('/getAllCustomers', requireAuth, requireAdmin ,asyncHandler(AdminController.getAllCustomers));
adminrouter.delete('/togglelock/:id', requireAuth, requireAdmin, asyncHandler(AdminController.toggleLock));
adminrouter.post('/createproducttype', requireAuth, requireAdmin, asyncHandler(AdminController.createproducttype));
adminrouter.post('/createcategory/:id', requireAuth, requireAdmin, asyncHandler(AdminController.createCategory));
adminrouter.post('/createsubcategory/:id', requireAuth, requireAdmin, asyncHandler(AdminController.createSubCategory));
adminrouter.post('/createProduct', requireAuth, requireAdmin, upload.single('imagePath'), asyncHandler(AdminController.createProduct));
adminrouter.post('/updateproduct/:id', requireAuth, requireAdmin, upload.single('imagePath'), asyncHandler(AdminController.updateProduct));
adminrouter.delete('/deleteProduct/:id', requireAuth, requireAdmin, asyncHandler(AdminController.deleteProduct));
adminrouter.get('/getallorders', requireAuth, requireAdmin, updateOrderStatusMiddleware, asyncHandler(AdminController.getAllOrders));
adminrouter.get('/checkprodid/:id', requireAuth, requireAdmin, asyncHandler(AdminController.checkprodid));
adminrouter.get('/checkcatid/:id', requireAuth, requireAdmin, asyncHandler(AdminController.checkcatid));
export default adminrouter

