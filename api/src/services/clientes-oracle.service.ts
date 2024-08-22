// services/clientes.service.ts
import { connPool } from '../connections/oracleDB';

export async function getClientesFromDB(documents: number[]) {
  let connection;
  try {
    connection = await connPool();
  } catch (error) {
    console.log(error);
    throw new Error('Error al intentar conectar con la base de datos');
  }

  try {
    const promises = documents.map(async (cc) => {
      try {
        const result = await connection.execute('SELECT DOCUMENTO FROM CLIENTES WHERE DOCUMENTO = :documento', [cc]);

        if (result.rows?.length === 0) {
          return { DOCUMENTO: cc, Existe: false };
        } else {
          return { DOCUMENTO: cc, Existe: true };
        }
      } catch (queryError) {
        return { DOCUMENTO: cc, Existe: false, ERROR: 'Error al ejecutar la consulta', details: queryError };
      }
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    throw new Error('Error al procesar los documentos');
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