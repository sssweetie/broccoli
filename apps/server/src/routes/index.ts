import { Router } from 'express';
import { tableRouter } from './TableRouter';
import { taskRouter } from './TaskRouter';
import { auditRouter } from './AuditRouter';
import { boardRouter } from './BoardRouter';
import { webhookRouter } from './WebhookRouter';
import { userRouter } from './UserRouter';
import { orgRouter } from './OrgRouter';
import { subTaskRouter } from './SubTaskRouter';
import { subTasksRouter } from './SubTasksRouter';

export const router = Router();

router.use('/dragdrop/table', tableRouter);
router.use('/dragdrop/task', taskRouter);
router.use('/dragdrop/audit', auditRouter);
router.use('/dragdrop/subtask', subTaskRouter);
router.use('/dragdrop/subtasks', subTasksRouter);
router.use('/boards', boardRouter);
router.use('/webhook', webhookRouter);
router.use('/webhook', userRouter);
router.use('/webhook', orgRouter);
