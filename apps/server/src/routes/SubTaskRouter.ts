import { Router } from 'express';
import { SubTaskController } from '../controllers/SubTaskController';

export const subTaskRouter = Router();

subTaskRouter.get('/read/:id', async (req, res) => {
  try {
    const subTask = await SubTaskController.read(req.params.id as string);
    res.status(200).send(subTask);
  } catch {
    res.status(400).send('error read data');
  }
});

subTaskRouter.put('/update', async (req, res) => {
  try {
    await SubTaskController.update(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error update data');
  }
});

subTaskRouter.post('/create', async (req, res) => {
  try {
    await SubTaskController.create(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});

subTaskRouter.delete('/delete/:id', async (req, res) => {
  try {
    await SubTaskController.delete(req.params.id as string);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});
