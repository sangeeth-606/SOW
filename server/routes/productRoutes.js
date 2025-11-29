import express from 'express';
const router = express.Router();
import { getProducts, updateProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


router.use(authenticateToken);

router.get('/', getProducts);
router.put('/:id', updateProduct);

export default router;
