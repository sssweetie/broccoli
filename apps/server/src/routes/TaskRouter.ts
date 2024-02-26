import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

export const taskRouter = Router();

taskRouter.post('/create', async (req, res) => {
  try {
    await TaskController.create(req.body.addTask);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});

taskRouter.get('/read', async (req, res) => {
  try {
    await TaskController.read(req.query.id as string);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});

taskRouter.put('/update', async (req, res) => {
  try {
    await TaskController.update(req.body.updateTask);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});

taskRouter.delete('/delete/:id', async (req, res) => {
  try {
    await TaskController.delete(req.params.id as string);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});
