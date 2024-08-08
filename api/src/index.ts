import { ClientesRouter } from './routes/clientes.routes'
import express from "express"
import mrg from 'morgan'
import cors from 'cors'

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(mrg('dev'));

app.use('/api/chat/v1', ClientesRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
