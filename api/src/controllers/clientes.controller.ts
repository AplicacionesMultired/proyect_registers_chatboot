import { connPool } from '../connections/oracleDB'
import { Request, Response } from 'express'

const Props = 'DOCUMENTO, NOMBRES, APELLIDO1, APELLIDO2, FECHANACIMIENTO, TELEFONO, MAIL'

export async function getClientes(req: Request, res: Response) {
  const data = req.body

  console.log(data)

  try {
    connPool()
      .then(async (connection) => {
        const result = await connection.execute(`SELECT ${Props} FROM CLIENTES WHERE DOCUMENTO = :documento`, [1118307852])
        return  res.json(result.rows)
      })
      .catch((error) => { throw error })
  } catch (error) {
    return res.status(500).json(error)
  }
}