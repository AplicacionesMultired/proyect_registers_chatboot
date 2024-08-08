import { chat_bot } from '../connections/chat-bot-92'
import { DataTypes, Model, Optional } from 'sequelize'
import { ClienteType } from '../schemas/Cliente.Schema'

interface PyumboAttributes extends  ClienteType{
  fregistro?: Date;
}

type PyumboCreationAttributes = Optional<PyumboAttributes, 'cedula'>

class Pyumbo extends Model<PyumboAttributes, PyumboCreationAttributes> {
  declare cedula: number;
  declare nombre: string;
  declare telefono: string;
  declare correo: string;
  declare telwhats: string;
  declare fregistro: Date;
}

Pyumbo.init({
  cedula: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  correo: { type: DataTypes.STRING, allowNull: false },
  telwhats: { type: DataTypes.STRING, allowNull: false },
  fregistro: { type: DataTypes.DATE, allowNull: false }
}, {
  sequelize: chat_bot,
  tableName: 'personayumbo',
  timestamps: false
})

export { Pyumbo }