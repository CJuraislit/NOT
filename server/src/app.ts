import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandler } from './middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running ' });
});

export default app;
