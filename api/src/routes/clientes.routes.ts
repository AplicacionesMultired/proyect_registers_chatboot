import { Router } from "express";
import { getClientes } from '../controllers/clientes.controller'

export const ClientesRouter = Router();

// ESTA RUTA ES PARA ORACLE AUNQUE PUEDE QUE NO SE USE PENDIENTE POR CONFIRMAR
ClientesRouter.post('/c-oracle', getClientes)