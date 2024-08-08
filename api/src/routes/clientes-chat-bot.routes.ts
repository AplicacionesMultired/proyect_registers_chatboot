import { Router } from "express";
import { getClientsSinRegistro, updateClienteSinRegistro, getClientBycc } from "../controllers/clientes-chat-bot.controller";

export const ClientesChatBootRouter = Router();

ClientesChatBootRouter.get('/c-chat-bot', getClientsSinRegistro)

ClientesChatBootRouter.get('/c-chat-bot/:cc', getClientBycc)

ClientesChatBootRouter.patch('/c-chat-bot', updateClienteSinRegistro)