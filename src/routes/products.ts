import express from 'express';
import {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/products';

const router = express.Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.get('/:Id', getProduct);

router.delete('/:Id', deleteProduct);

router.put('/:Id', updateProduct);

export default router;
