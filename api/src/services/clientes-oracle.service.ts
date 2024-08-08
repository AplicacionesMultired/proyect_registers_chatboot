// services/clientes.service.ts
import { connPool } from '../connections/oracleDB';

export async function getClientesFromDB(documents: number[]) {
  let connection;
  try {
    connection = await connPool();
  } catch (error) {
    throw new Error('Error al conectar a la base de datos');
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