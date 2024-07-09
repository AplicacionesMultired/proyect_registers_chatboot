import { initOracleClient } from 'oracledb'
import { Sequelize } from 'sequelize'
import 'dotenv/config'

const USER = process.env.ORACLE_DB_USER as string
const PASSWORD = process.env.ORACLE_DB_PASS as string
const HOST = process.env.ORACLE_DB_HOST as string
const PORT = process.env.ORACLE_DB_PORT as string
const DB = process.env.ORACLE_DB_NAME as string
const PATH = process.env.ORACLE_DB_PATH as string

initOracleClient({ libDir: PATH })

const oracleDB = new Sequelize(DB, USER, PASSWORD,
  {
    dialect: 'oracle',
    host: HOST,
    port: parseInt(PORT)
  }
)

export { oracleDB }

