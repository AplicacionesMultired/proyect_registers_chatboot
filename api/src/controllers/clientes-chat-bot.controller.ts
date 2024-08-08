import { Request, Response } from 'express'
import { Pyumbo } from '../models/pyumbo' 

import { getClientesFromDB } from '../services/clientes-oracle.service'
import { Pjamundi } from '../models/pjamundi';

export async function getClientsSinRegistro (req: Request, res: Response){
  const { company, option } = req.query

  try {
    let clients = []
    let response

    if (company === 'Multired'){
      await Pyumbo.sync()
      clients = await Pyumbo.findAll()
    } else if (company === 'Servired') {
      await Pjamundi.sync()
      clients = await Pjamundi.findAll()
    } else {
      return res.status(400).json({ message: 'company is required' })
    }

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

    if ( option === 'sin-registro' ) {
      response = unifiedClients.filter((client) => client.Existe === false)
    } else if ( option === 'con-registro' ) {
      response = unifiedClients.filter((client) => client.Existe === true)
    }
    
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}