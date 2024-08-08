import { ClientesChatBootRouter } from './routes/clientes-chat-bot.routes';
import { ClientesRouter } from './routes/clientes.routes'

import express from "express"
import mrg from 'morgan'
import cors from 'cors'

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://172.20.1.110:5173',
  credentials: true
}));
app.use(mrg('dev'));

app.use('/api/chat/v1', ClientesRouter)
app.use('/api/chat/v1', ClientesChatBootRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
