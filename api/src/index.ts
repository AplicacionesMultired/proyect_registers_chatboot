import { ClientesChatBootRouter } from './routes/clientes-chat-bot.routes';
import { ClientesRouter } from './routes/clientes.routes'
import 'dotenv/config'

import express from "express"
import mrg from 'morgan'
import cors from 'cors'

const URL_CORS = process.env.URL_CORS

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: URL_CORS,
  credentials: true
}));
app.use(mrg('dev'));

app.use('/api/chat/v1', ClientesRouter)
app.use('/api/chat/v1', ClientesChatBootRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
