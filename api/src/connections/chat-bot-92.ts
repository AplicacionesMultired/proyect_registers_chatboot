import { Sequelize } from "sequelize";
import 'dotenv/config';

const DB_HOST = process.env.HOSTMYSQL as string;
const DB_USER = process.env.USUARIO as string;
const DB_PASS = process.env.PASSWORD as string;
const DB_NAME = process.env.NAME_DATABASE as string;;

const chat_bot = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mariadb'
})

export { chat_bot};