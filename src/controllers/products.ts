import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFileSync } from 'fs';

const {
  createProductSchema,
  updateProductSchema,
} = require('../helpers/ValidationSchemas');

type Product = {
  Id: string;
  Name: string;
  Price: number;
  UpdateDate?: Date;
};

export const getProducts = (req: Request, res: Response) => {
  const products = readDataFromJSONFile();

  res.send(products);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductSchema.validateAsync(req.body);

    let products = readDataFromJSONFile();

    products.push({ ...product, Id: uuidv4() });

    const productsParsed = JSON.stringify(products);

    writeFileSync('./src/products.json', productsParsed);

    res.send(`Product with the name ${product.Name} added to the database`);
  } catch (e) {
    res.send(e);
  }
};

export const getProduct = (req: Request, res: Response) => {
  const products = readDataFromJSONFile();

  const { id } = req.params;
  const foundProduct = products.find((product: Product) => product.Id === id);

  foundProduct
    ? res.send(foundProduct)
    : res.send(`Product with id: ${id} doesn't exist`);
};

export const deleteProduct = (req: Request, res: Response) => {
  let products = readDataFromJSONFile();

  const { id } = req.params;

  const foundProduct = products.find((product: Product) => product.Id === id);

  if (foundProduct) {
    products = products.filter((product) => product.Id !== id);
    const productsParsed = JSON.stringify(products);
    writeFileSync('./src/products.json', productsParsed);
    res.send(`Product with the id: ${id} deleted`);
  } else {
    res.send(`Product with the id: ${id} doesn't exist`);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let products = readDataFromJSONFile();
    const validatedProduct = await updateProductSchema.validateAsync(req.body);

    products.map((product, index) => {
      if (product.Id === id) {
        if (validatedProduct.Name) product.Name = validatedProduct.Name;
        if (validatedProduct.Price) product.Price = validatedProduct.Price;
        product.UpdateDate = new Date();
        products[index] = product;
        const productsParsed = JSON.stringify(products);
        writeFileSync('./src/products.json', productsParsed);
        res.send(`Product with the id ${id} has been updated`);
      }
    });
    res.send(`Product with the id ${id} doesn't exits`);
  } catch (e) {
    res.send(e);
  }
};

const readDataFromJSONFile = (): Product[] => {
  const data = readFileSync('./src/products.json');
  const response = JSON.parse(data.toString());
  return response;
};
