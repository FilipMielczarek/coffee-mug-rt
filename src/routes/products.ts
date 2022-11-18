import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const { createProductSchema } = require('../helpers/ValidationSchemas');

type ProductsTypes = {
  Id: string;
  Name: string;
  Price: number;
}[];

const router = express.Router();

const products: ProductsTypes = [];

router.get('/', (req: Request, res: Response) => {
  res.send(products);
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const product = await createProductSchema.validateAsync(req.body);
    products.push({ ...product, Id: uuidv4() });
    res.send(`Product with the name ${product.Name} added to the database`);
  } catch (e) {
    res.send(e);
  }
});

export default router;
