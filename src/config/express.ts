import express from 'express';
import cors from 'cors';
import errorHandler from '../controllers/errorHandler';
const createServer = (): Express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable('x-powered-by');
  app.get('/health', (req, res) => {
    res.send('UP');
  });
  // app.use('/', locationRouter);
  app.use(errorHandler);

  return app;
};
export { createServer };
