import { readFileSync } from 'fs';

type Product = {
  Id: string;
  Name: string;
  Price: number;
  UpdateDate?: Date;
};

export const readDataFromJSONFile = (): Product[] => {
  const data = readFileSync('./src/products.json');
  const response = JSON.parse(data.toString());
  return response;
};
