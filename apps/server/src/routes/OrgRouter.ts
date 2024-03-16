/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from 'body-parser';
import { Router } from 'express';
import { Webhook } from 'svix';
import dotenv from 'dotenv';
import { OrgController } from '../controllers/OrgController';

dotenv.config();

export const orgRouter = Router();

orgRouter.post(
  '/org',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const payload = JSON.stringify(req.body);
    const headers: any = req.headers;
    const wh = new Webhook(process.env.CLERK_KEY);
    try {
      const evt: any = wh.verify(payload, headers);
      const { id } = evt.data;

      if (evt.type === 'organization.created') {
        await OrgController.create(id);
      }

      if (evt.type === 'organization.deleted') {
        await OrgController.delete(id);
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
