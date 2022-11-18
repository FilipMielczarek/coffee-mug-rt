import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  const age: number = 40;

  res.json({ message: `The age is ${age}` });
});

app.listen('3001', (): void => {
  console.log('Server running');
});
