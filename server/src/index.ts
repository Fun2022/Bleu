import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as DotEnv from 'dotenv';
import RateLimit from 'express-rate-limit';
import DataBase from './database';
import { join } from 'path';
import ApiRouter from './Api';
DotEnv.config();

export const db: DataBase = new DataBase("database.db");
export const JWT_KEY: string = (process.env.JWT as string);

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT: string|number = process.env.PORT || 5000;

app.use(express.static(join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(RateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: { "code": "401", "message": "YOU_ARE_RATE_LIMIT" },
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 401
}));

app.use('/api', ApiRouter);

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, (): void => console.log(`server listen ${PORT}`));