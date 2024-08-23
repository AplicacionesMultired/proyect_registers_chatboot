import { Request, Response } from 'express'

import { getClientesFromDB } from '../services/clientes-oracle.service'
import { connPool } from '../connections/oracleDB'
import { validateCliente } from '../schemas/Cliente.Schema';

import { Pyumbo } from '../models/pyumbo' 
import { Pjamundi } from '../models/pjamundi';
import { ValidateSchemaClienteFiel } from '../schemas/ClieFiel.Schema';
import { ZodIssue } from 'zod';

const properties = 'DOCUMENTO,TOTALPUNTOS,USUARIO,FECHASYS,NOMBRES,APELLIDO1,APELLIDO2,FECHANACIMIENTO,TELEFONO,DIRECCION,TIPO_DEPTO,CODDEPTO,TIPO_MUNICIPIO,CODMUNICIPIO,ENT_SEXO,DAT_DTO_SEXO,DOCALTERNO,NRO_FAVORITO,VERSION,CCOSTO,MAIL,NOMBRE1,NOMBRE2,CELULAR,ACEPTAPOLITICATDP,CLIENTEVENDEDOR,CLAVECANAL,TPOTRT_CODIGO_NACION,TRT_CODIGO_NACION,TPOTRT_CODIGO_EXPDOC,TRT_CODIGO_EXPDOC,FECHAEXPDOC,DTO_CODIGO_TPDOC,ENT_CODIGO_TPDOC,IDLOGIN,SECURITY_TOKEN'


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
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateClienteSinRegistro (req: Request, res: Response) {
  const { data, company } = req.body
  const result = await validateCliente(data)

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

    console.log(result.data);
    
    // const connection = await connPool()
    // const query = await connection.execute(`
    //   INSERT INTO GAMBLE.CLIENTES (${properties}) values ('43456545','u+#^maj^QÕ','CP1118307852',
    //   to_date('10/10/24', 'DD/MM/RR'),'Ivan Daniel', 'Ortega','Garzon',to_date('01/01/97','DD/MM/RR'), '6696901','Cra 4 # 4-51',
    //   '6','30','8','965', '60', '34', '43456545','','0','0','exampe24124@gmail.com', 'Ivan', 'Daniel', '4151234151','S', 'N',
    //   'CHATBOOT', '2', '1','8','76892', to_date('01/01/15','DD/MM/RR'), '35', '70', null,null)`
    // )

    // console.log(query);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}