/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from 'body-parser';
import { Router } from 'express';
import { Webhook } from 'svix';
import dotenv from 'dotenv';
import { UserController } from '../controllers/UserController';

dotenv.config();

export const userRouter = Router();

userRouter.post(
  '/user',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const payload = JSON.stringify(req.body);
    const headers: any = req.headers;
    const wh = new Webhook(process.env.CLERK_KEY);
    try {
      const evt: any = wh.verify(payload, headers);
      const { id } = evt.data;

      if (evt.type === 'user.created') {
        await UserController.create(id);
      }

      if (evt.type === 'user.deleted') {
        await UserController.delete(id);
      }

      res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
  }
);
