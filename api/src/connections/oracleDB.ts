import oracledb  from 'oracledb'
import 'dotenv/config'

const oracleLibDir = process.env.ORACLE_DB_DIR
const username = process.env.ORACLE_DB_USER
const password = process.env.ORACLE_DB_PASSWORD
const connectString = process.env.ORACLE_DB_STRING
const diroracleadm = process.env.ORACLE_DB_DIR

oracledb.initOracleClient({ libDir: oracleLibDir })

export async function connPool () {
    const pool = await oracledb.createPool({
      user: username,
      password: password,
      connectString: connectString,
      configDir: diroracleadm,
      poolMax: 10
    })

    try {
      let connection = await pool.getConnection()
      return connection
    } catch (error) {
      throw error
    }
}
