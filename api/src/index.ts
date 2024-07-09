import express from "express"
import { ClientesRouter } from './routes/clientes.routes'

const app = express();
const port = 3000;

app.use(express.json());

app.use(ClientesRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})