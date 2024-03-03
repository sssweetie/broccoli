/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from 'body-parser';
import { Router } from 'express';
import { Webhook } from 'svix';
import { UserModel } from '../models/UserModel';
import dotenv from 'dotenv';

dotenv.config();

export const webhookRouter = Router();

webhookRouter.post(
  '/',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const payload = JSON.stringify(req.body);
    const headers: any = req.headers;
    const wh = new Webhook(process.env.CLERK_KEY);
    try {
      const evt: any = wh.verify(payload, headers);
      const { id } = evt.data;
      const eventType = evt.type;

      if (eventType === 'user.created') {
        const user = new UserModel({ clerkUserId: id });
        await user.save();
      }

      if (eventType === 'user.deleted') {
        await UserModel.findOneAndDelete({ clerkUserId: id });
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
