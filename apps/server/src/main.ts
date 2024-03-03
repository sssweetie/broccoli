import './db';
import { router } from './routes';
import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import http = require('http');

const app = express();
const port = 3001;
const client = 'http://localhost:4200';

app.use(cors());
app.use(express.json());
app.use('/api', router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: client,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});


server.listen(port, () => console.log(`Server is starting in port ${port}`));
