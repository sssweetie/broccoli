import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

export const taskRouter = Router();

taskRouter.post('/create', async (req, res) => {
  try {
    await TaskController.create(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});
