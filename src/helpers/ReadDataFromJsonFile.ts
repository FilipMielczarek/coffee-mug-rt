import { readFileSync } from 'fs';
import path from 'path';

type Product = {
  Id: string;
  Name: string;
  Price: number;
  UpdateDate?: Date;
};

const dbFile = path.join(__dirname, '..', '..', 'mock_db', 'products.json');

export const readDataFromJSONFile = (): Product[] => {
  const data = readFileSync(dbFile);
  const response = JSON.parse(data.toString());
  return response;
};
