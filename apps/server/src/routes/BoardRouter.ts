import { Router } from 'express';
import { BoardController } from '../controllers/BoardController';

export const boardRouter = Router();

boardRouter.post('/create', async (req, res) => {
  try {
    await BoardController.create(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});

boardRouter.get('/read', async (req, res) => {
  try {
    const boards = await BoardController.read();
    res.status(200).send(boards);
  } catch {
    res.status(400).send('error fetch data');
  }
});

boardRouter.put('/update', async (req, res) => {
  try {
    await BoardController.update(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error fetch data');
  }
});

boardRouter.delete('/delete/:id', async (req, res) => {
  try {
    await BoardController.delete(req.params.id as string);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error fetch data');
  }
});
