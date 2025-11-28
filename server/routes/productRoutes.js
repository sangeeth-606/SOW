import express from 'express';
const router = express.Router();
import { getProducts, updateProduct } from '../controllers/productController.js';

// add middleware to verify JWT
router.get('/', getProducts);
router.put('/:id', updateProduct);

export default router;
