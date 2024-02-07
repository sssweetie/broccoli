import { Router } from 'express';
import { tableRouter } from './TableRouter';

export const router = Router();

router.use('/dragdrop', tableRouter);
