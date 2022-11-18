import express, { Request, Response } from 'express';
import productsRoutes from './routes/products';
import { PORT } from './constants/ExpressPort';

const app = express();

app.use(express.json());
app.use('/products', productsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Test API in Postman, use JSON formatter for better results');
});

app.listen(PORT, () => {});
