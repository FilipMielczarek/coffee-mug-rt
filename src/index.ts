import express, { Request, Response } from 'express';
import productsRoutes from './routes/products';

const app = express();
const PORT = 5001;

app.use(express.json());
app.use('/products', productsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from homepage');
});

app.listen(PORT, () => {});
