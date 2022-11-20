import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import productsRoutes from './routes/products';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/products', productsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Test API in Postman, use JSON formatter for better results');
});

app.listen(PORT, () => {});
