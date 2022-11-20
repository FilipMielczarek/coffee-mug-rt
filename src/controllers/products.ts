import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { writeFileSync } from 'fs';
import { readDataFromJSONFile } from '../helpers/readDataFromJsonFile';
import path from 'path';

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

const dbFile = path.join(__dirname, '..', '..', 'mock_db', 'products.json');

export const getProducts = (req: Request, res: Response) => {
  try {
    const products = readDataFromJSONFile();
    res.status(200).send(products);
  } catch {
    res.status(404).send(`Products database doesn't exist`);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductSchema.validateAsync(req.body);
    let products = readDataFromJSONFile();

    products.push({ ...product, Id: uuidv4() });
    const productsParsed = JSON.stringify(products);
    writeFileSync(dbFile, productsParsed);

    res
      .status(200)
      .send(`Product with the name ${product.Name} added to the database`);
  } catch (e) {
    res.status(406).send(e);
  }
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  const products = readDataFromJSONFile();
  const foundProduct = products.find((product: Product) => product.Id === id);

  if (foundProduct) {
    res.status(200).send(foundProduct);
  } else {
    res.status(404).send(`Product with id: ${id} doesn't exist`);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    let products = readDataFromJSONFile();
    const validatedProduct = await updateProductSchema.validateAsync(req.body);

    products.map((product, index) => {
      if (product.Id === id) {
        if (validatedProduct.Name) product.Name = validatedProduct.Name;
        if (validatedProduct.Price) product.Price = validatedProduct.Price;
        product.UpdateDate = new Date();

        products[index] = product;
        const productsParsed = JSON.stringify(products);
        writeFileSync(dbFile, productsParsed);
        res.status(200).send(`Product with the id ${id} has been updated`);
      }
    });
    res.status(404).send(`Product with the id ${id} doesn't exits`);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  let products = readDataFromJSONFile();
  const foundProduct = products.find((product: Product) => product.Id === id);

  if (foundProduct) {
    products = products.filter((product) => product.Id !== id);

    const productsParsed = JSON.stringify(products);
    writeFileSync(dbFile, productsParsed);
    res.status(200).send(`Product with the id: ${id} deleted`);
  } else {
    res.status(404).send(`Product with the id: ${id} doesn't exist`);
  }
};
