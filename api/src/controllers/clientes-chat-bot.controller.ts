import { Request, Response } from 'express'

import { getClientesFromDB } from '../services/clientes-oracle.service'
import { validateCliente } from '../schemas/Cliente.Schema';
import { connPool } from '../connections/oracleDB'

import { ValidateSchemaClienteFiel } from '../schemas/ClieFiel.Schema';
import { sendEmail, sendEmailDelete } from '../services/nodemailer';
import { Pjamundi } from '../models/pjamundi';
import { Pyumbo } from '../models/pyumbo' 
import { ZodIssue } from 'zod';

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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateClienteSinRegistro (req: Request, res: Response) {
  const { data, company } = req.body

  const result = await validateCliente(data) //TODO: valida la data que se recibe desde el front 

  if (!result.success) {
    return res.status(400).json({ message: 'Error en la validación de datos', 
      errors: result.error.issues.map( (issue: ZodIssue) => { return issue.message } )})
  }

  try {
    if (company === 'Multired'){
      await Pyumbo.sync()
      const client = await Pyumbo.update(result.data, { where: { cedula: data.cedula } })
      return res.status(200).json(client[0])
    } else if (company === 'Servired') {
      await Pjamundi.sync()
      const client = await Pjamundi.update(result.data, { where: { cedula: data.cedula } })
      return res.status(200).json(client[0])
    } else {
      return res.status(400).json({ message: 'company is required' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }

}

export async function createClienteFiel(req: Request, res: Response) {  
  try {
    const result = await ValidateSchemaClienteFiel(req.body)

    if (!result.success) {
      return res.status(400).json({ message: 'Error en la validación de datos', 
        errors: result.error.issues.map( (issue: ZodIssue) => { return issue.message } )})
    }

    const connection = await connPool()
    
    const query = await connection.execute(`
      INSERT INTO GAMBLE.CLIENTES (DOCUMENTO,TOTALPUNTOS,USUARIO,FECHASYS,NOMBRES,APELLIDO1,APELLIDO2,FECHANACIMIENTO,TELEFONO,DIRECCION,TIPO_DEPTO,CODDEPTO,TIPO_MUNICIPIO,
      CODMUNICIPIO,ENT_SEXO,DAT_DTO_SEXO,DOCALTERNO,NRO_FAVORITO,VERSION,CCOSTO,MAIL,NOMBRE1,NOMBRE2,CELULAR,ACEPTAPOLITICATDP,CLIENTEVENDEDOR,CLAVECANAL,
      TPOTRT_CODIGO_NACION,TRT_CODIGO_NACION,TPOTRT_CODIGO_EXPDOC,TRT_CODIGO_EXPDOC,FECHAEXPDOC,DTO_CODIGO_TPDOC,ENT_CODIGO_TPDOC,IDLOGIN,SECURITY_TOKEN) 
      VALUES ('${result.data.cedula}','u+#ajÕ', '${result.data.user}',to_date('01/01/24', 'DD/MM/RR'),'${result.data.name1} ${result.data.name2}', 
      '${result.data.lastname1}','${result.data.lastname2}',to_date('19/01/97','DD/MM/RR'), '6696901','Cra 4 # 4-51', '6','30','8','965', '60', 
      '${result.data.genero}', '${result.data.cedula}','','0','0','${result.data.correo}', '${result.data.name1}', '${result.data.name2}', '${result.data.telefono}',
      'S', 'N', 'CHATBOOT', '2', '1','8','76892',to_date('01/01/15','DD/MM/RR'), '35', '70', null,null)`)

    if(query.rowsAffected === 1){
      await connection.commit()
      await connection.close()
      await sendEmail(result.data)
      return res.status(201).json({ message: 'Cliente creado con éxito' })
    } else {
      await connection.rollback()
      await connection.close()
      return res.status(500).json({ message: 'Error al crear cliente' })
    }

  } catch (error) {
    
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteClient(req:Request, res: Response) {
  const { user, motivo } = req.body 
  
  try {
    const response = await sendEmailDelete(user, motivo)
    return res.status(200).json({ message: response || 'Correo enviado' })
  } catch (error) {
    console.log(error);
    return res.status(500).json('someting went wrong')
  }
}