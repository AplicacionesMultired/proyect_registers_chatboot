import oracledb  from 'oracledb'
import 'dotenv/config'

// TODO: instanclient necesario para la conexión con la base de datos
oracledb.initOracleClient({ libDir: 'C:\\instantclient_11_2' })

export async function connPool () {
    const pool = await oracledb.createPool({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectString: 'DEMOPB',
      configDir: 'C:\\instantclient_11_2\\network\\admin',
      poolMax: 10
    })

    try {
      let connection = await pool.getConnection()
      return connection
    } catch (error) {
      throw error
    }
}
