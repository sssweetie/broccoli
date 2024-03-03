import { Router } from 'express';
import { tableRouter } from './TableRouter';
import { taskRouter } from './TaskRouter';
import { auditRouter } from './AuditRouter';

export const router = Router();

router.use('/dragdrop/table', tableRouter);
router.use('/dragdrop/task', taskRouter);
router.use('/dragdrop/audit', auditRouter);
