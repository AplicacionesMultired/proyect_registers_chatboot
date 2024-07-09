import { Router } from "express";
import { getClientes } from '../controllers/clientes.controller'

export const ClientesRouter = Router();

ClientesRouter.get('/clientes', getClientes)