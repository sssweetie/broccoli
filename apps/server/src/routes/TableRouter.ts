import { Router } from 'express';
import { TableController } from '../controllers/TableController';

export const tableRouter = Router();

tableRouter.get('/read', async (req, res) => {
  try {
    const tables = await TableController.read();
    res.status(200).send(tables);
  } catch {
    res.status(400).send('error fetch data');
  }
});

tableRouter.post('/create', async (req, res) => {
  try {
    await TableController.create(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});

tableRouter.put('/update', async (req, res) => {
  try {
    await TableController.update(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error update data');
  }
});
