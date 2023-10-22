import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes';
import expressWinston from 'express-winston';
import { expressLoggerOpts } from './logger';

dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:8080'
};
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressWinston.logger(expressLoggerOpts));
app.use(routes);

app.listen(PORT);
