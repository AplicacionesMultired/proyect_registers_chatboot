import { Request, Response } from 'express'

import { getClientesFromDB } from '../services/clientes-oracle.service'
import { validateCliente } from '../schemas/Cliente.Schema';

import { Pyumbo } from '../models/pyumbo' 
import { Pjamundi } from '../models/pjamundi';


export async function getClientBycc(req:Request, res: Response) {
  const { company } = req.query

  try {
    if (company === 'Multired'){
      await Pyumbo.sync()
      const client = await Pyumbo.findOne({ where: { cedula: req.params.cc } })
      return res.status(200).json(client)
    } else if (company === 'Servired') {
      await Pjamundi.sync()
      const client = await Pjamundi.findOne({ where: { cedula: req.params.cc } })
      return res.status(200).json(client)
    } else {
      return res.status(400).json({ message: 'company is required' })
    }
    
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

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
        Existe: result?.Existe
      }
    })

    if ( option === 'sin-registro' ) {
      response = unifiedClients.filter((client) => client.Existe === false).reverse()
    } else if ( option === 'con-registro' ) {
      response = unifiedClients.filter((client) => client.Existe === true).reverse()
    } else {
      return res.status(400).json({ message: 'option is required' })
    }
    
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateClienteSinRegistro (req: Request, res: Response){
  const { data, company } = req.body
  const resultValidate = await validateCliente(data)

  console.log(resultValidate);

  try {
    if (resultValidate.error) {
      return res.status(400).json(resultValidate.error)
    }

    if(company === 'Multired'){
      await Pyumbo.sync()
      await Pyumbo.update(data, { where: { cedula: data.cedula } })
    } else if (company === 'Servired') {
      await Pjamundi.sync()
      await Pjamundi.update(data, { where: { cedula: data.cedula } })
    } else {
      return res.status(400).json({ message: 'company is required' })
    }

    return res.status(200).json({ message: 'Cliente Actualizado Correctamente' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
  
}