import { Router } from 'express';
import { AuditController } from '../controllers/AuditController';

export const auditRouter = Router();

auditRouter.get('/read/:id', async (req, res) => {
  try {
    const audit = await AuditController.read(req.params.id as string);
    res.status(200).send(audit);
  } catch {
    res.status(400).send('error fetch data');
  }
});

auditRouter.post('/create', async (req, res) => {
  try {
    await AuditController.create(req.body);
    res.sendStatus(200);
  } catch {
    res.status(400).send('error create data');
  }
});
