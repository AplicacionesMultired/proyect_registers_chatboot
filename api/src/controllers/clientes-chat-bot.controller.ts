import { Request, Response } from 'express'
import { Pyumbo } from '../models/pyumbo' 

import { getClientesFromDB } from '../services/clientes-oracle.service'

export async function getClientsSinRegistro (_req: Request, res: Response){
  try {
    await Pyumbo.sync()
    const clients = await Pyumbo.findAll()

    const ccs = clients.map((client) => {
      return client.dataValues.cedula
    })

    const resulst = await getClientesFromDB(ccs)
    
    const unifiedClients = clients.map((client) => {
      const clientData = client.dataValues
      const result = resulst.find((cc) => cc.DOCUMENTO === clientData.cedula)

      return {
        ...clientData,
        Existe: result?.Existe,
        ERROR: result?.ERROR
      }
    })

    const clienteSinRegistro = unifiedClients.filter((client) => client.Existe === false)
    
    return res.status(200).json(clienteSinRegistro)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}