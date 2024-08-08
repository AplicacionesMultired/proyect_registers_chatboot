import { Request, Response } from 'express';
import { connPool } from '../connections/oracleDB'; 

export async function getClientes(req: Request, res: Response) {
  const { documents } = req.body as { documents: number[] };

  let connection;
  try {
    connection = await connPool();
  } catch (error) {
    return res.status(500).json({ error: 'Error al conectar a la base de datos', details: error });
  }

  try {
    const promises = documents.map(async (cc) => {
      try {
        const result = await connection.execute('SELECT DOCUMENTO FROM CLIENTES WHERE DOCUMENTO = :documento', [cc]);

        if (result.rows?.length === 0) {
          return { DOCUMENTO: cc, Existe: false, ERROR: 'Cliente no encontrado' };
        } else {
          return { DOCUMENTO: cc, Existe: true, ERROR: null };
        }
      } catch (queryError) {
        return { DOCUMENTO: cc, Existe: false, ERROR: 'Error al ejecutar la consulta', details: queryError };
      }
    });

    const results = await Promise.all(promises);

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: 'Error al procesar los documentos', details: error });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error('Error al cerrar la conexión', closeError);
      }
    }
  }
}