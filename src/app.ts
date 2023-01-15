// change to ts config
import express from 'express';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'https';

async function handlePost(req: Request, res: Response) {
    const body = req.body;
    console.log(body);
    res.send('OK');
}

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    handlePost(req, res);
});

const config_file = readFileSync('../config.jsonc', 'utf-8');
const config = JSON.parse(config_file);

const server = createServer(
    {
        key: readFileSync(process.env.HTTPS_KEY as string),
        cert: readFileSync(process.env.HTTPS_CERT as string),
        ca: readFileSync(process.env.HTTPS_CA as string),
    },
    app
);

server.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});
