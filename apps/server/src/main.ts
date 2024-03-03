import './db';
import { router } from './routes';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.listen(port, () => console.log(`Server is starting in port ${port}`));
