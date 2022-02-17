import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { join } from 'path';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT: string|number = process.env.PORT || 5000;

app.use(express.static(join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/register', (req, res) => {
    if(!req.body) return res.json({ "error": "INVALID_BODY" });
    
    if(!req.body["username"]) return res.json({ "error": "INVALID_BODY" });
    if(!req.body["email"]) return res.json({ "error": "INVALID_BODY" });
    if(!req.body["password"]) return res.json({ "error": "INVALID_BODY" });

    return res.json({ "sucess": "ACCOUNT_CREATED" });
});

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, (): void => console.log(`server listen ${PORT}`));