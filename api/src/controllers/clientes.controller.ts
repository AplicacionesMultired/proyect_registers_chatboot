import { Request, Response } from 'express'
import { Cliente } from '../models/clientes.model'

export async function getClientes(req: Request, res: Response) {
  try {
    const resulst = await Cliente.findAll()

    return res.status(200).json(resulst)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}