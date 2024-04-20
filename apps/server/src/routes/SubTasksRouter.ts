import { Router } from 'express';
import { SubTasksController } from '../controllers/SubTasksController';

export const subTasksRouter = Router();

subTasksRouter.get('/read', async (req, res) => {
  try {
    const subTasks = await SubTasksController.read(
      req.query.dateTo as string,
      req.query.dateFrom as string
    );
    res.status(200).send(subTasks);
  } catch {
    res.status(400).send('error read data');
  }
});
