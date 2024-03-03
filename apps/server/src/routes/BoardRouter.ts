import { Router } from 'express';
import { BoardController } from '../controllers/BoardController';

export const boardRouter = Router();

boardRouter.get('/read', async (req, res) => {
  try {
    const boards = await BoardController.read();
    res.status(200).send(boards);
  } catch {
    res.status(400).send('error fetch data');
  }
});

boardRouter.post('/create', async (req, res) => {
  try {
    await BoardController.create(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});
