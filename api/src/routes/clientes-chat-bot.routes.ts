import { Router } from "express";
import { getClientsSinRegistro } from "../controllers/clientes-chat-bot.controller";

export const ClientesChatBootRouter = Router();

ClientesChatBootRouter.get('/c-chat-bot', getClientsSinRegistro)