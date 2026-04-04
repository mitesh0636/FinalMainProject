import { Router } from 'express';
import { asyncHandler } from '../utils/asynchandler';
import { ProductController } from '../controllers/Product.controller';
const productrouter = Router();

productrouter.get('/', asyncHandler(ProductController.getProducts));
productrouter.get('/search', asyncHandler(ProductController.search));
productrouter.get('/:id', asyncHandler(ProductController.getProductById));

export default productrouter;


