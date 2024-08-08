// controllers/clientes.controller.ts
import { Request, Response } from 'express';
import { getClientesFromDB } from '../services/clientes-oracle.service';

export async function getClientes(req: Request, res: Response) {
  const { documents } = req.body as { documents: number[] };

  try {
    const results = await getClientesFromDB(documents);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
}