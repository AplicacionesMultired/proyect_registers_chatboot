import { getClientsSinRegistro, updateClienteSinRegistro, getClientBycc, createClienteFiel, deleteClient } from '../controllers/clientes-chat-bot.controller';
import { Router } from 'express';

export const ClientesChatBootRouter = Router();

ClientesChatBootRouter.get('/c-chat-bot', getClientsSinRegistro)

ClientesChatBootRouter.get('/c-chat-bot/:cc', getClientBycc)

ClientesChatBootRouter.patch('/c-chat-bot', updateClienteSinRegistro)

ClientesChatBootRouter.post('/register', createClienteFiel)

ClientesChatBootRouter.post('/delete-client', deleteClient)