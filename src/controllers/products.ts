import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const { createProductSchema } = require('../helpers/ValidationSchemas');

type ProductsTypes = {
  Id: string;
  Name: string;
  Price: number;
  UpdateDate?: Date;
}[];

let products: ProductsTypes = [];

export const getProducts = (req: Request, res: Response) => {
  res.send(products);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductSchema.validateAsync(req.body);
    products.push({ ...product, Id: uuidv4() });
    res.send(`Product with the name ${product.Name} added to the database`);
  } catch (e) {
    res.send(e);
  }
};

export const getProduct = (req: Request, res: Response) => {
  const { Id } = req.params;
  const foundProduct = products.find((product) => product.Id === Id);

  foundProduct
    ? res.send(foundProduct)
    : res.send(`Product with id: ${Id} doesn't exist`);
};

export const deleteProduct = (req: Request, res: Response) => {
  const { Id } = req.params;
  const foundProduct = products.find((product) => product.Id === Id);

  if (foundProduct) {
    products = products.filter((product) => product.Id !== Id);
    res.send(`Product with the id: ${Id} deleted`);
  } else {
    res.send(`Pomidor`);
  }
};

export const updateProduct = (req: Request, res: Response) => {
  const { Id } = req.params;
  const { Name, Price } = req.body;

  const product = products.find((product) => product.Id === Id);

  if (product && Name) product.Name = Name;
  if (product && Price) product.Price = Price;
  if (product) product.UpdateDate = new Date();

  product
    ? res.send(`User with the id ${Id} has been updated`)
    : res.send('Pomidor');
};
