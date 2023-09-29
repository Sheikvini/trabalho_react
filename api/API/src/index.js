import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import chamadaController from './controller/chamadaController.js'

let server = express();

server.use(cors())
server.use(express.json())

server.use(chamadaController)

server.listen(process.env.PORT, () => console.log('API subiu'))