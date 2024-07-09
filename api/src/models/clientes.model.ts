import { Model, DataTypes, Optional } from "sequelize";
import { oracleDB } from '../connections/oracleDB'

type ClienteAttributes = {
  DOCUMENTO: number
  TOTALPUNTOS: string
  USUARIO: string
  FECHASYS: Date
  NOMBRES: string
  APELLIDO1: string
  APELLIDO2: string
  FECHANACIMIENTO: Date
  TELEFONO: string
  DIRECCION: string
  TIPO_DEPTO: number
  CODDEPTO: number
  TIPO_MUNICIPIO: number
  CODMUNICIPIO: number
  ENT_SEXO: number
  DAT_DTO_SEXO: number
  DOCALTERNO: number
  NRO_FAVORITO: number
  VERSION: number
  CCOSTO: number | null
  MAIL: string | null
}

type ClientesCreationAttributes = Optional<ClienteAttributes, 'DOCUMENTO'>

class Cliente extends Model<ClienteAttributes, ClientesCreationAttributes> {
  declare DOCUMENTO: number
  declare TOTALPUNTOS: string
  declare USUARIO: string
  declare FECHASYS: Date
  declare NOMBRES: string
  declare APELLIDO1: string
  declare APELLIDO2: string
  declare FECHANACIMIENTO: Date
  declare TELEFONO: string
  declare DIRECCION: string
  declare TIPO_DEPTO: number
  declare CODDEPTO: number
  declare TIPO_MUNICIPIO: number
  declare CODMUNICIPIO: number
  declare ENT_SEXO: number
  declare DAT_DTO_SEXO: number
  declare DOCALTERNO: number
  declare NRO_FAVORITO: number
  declare VERSION: number
  declare CCOSTO: number | null
  declare MAIL: string | null
}

Cliente.init({
  DOCUMENTO: { type: DataTypes.NUMBER, primaryKey: true },
  TOTALPUNTOS: { type: DataTypes.STRING },
  USUARIO: { type: DataTypes.STRING },
  FECHASYS: { type: DataTypes.DATE },
  NOMBRES: { type: DataTypes.STRING },
  APELLIDO1: { type: DataTypes.STRING },
  APELLIDO2: { type: DataTypes.STRING },
  FECHANACIMIENTO: { type: DataTypes.DATE },
  TELEFONO: { type: DataTypes.STRING },
  DIRECCION: { type: DataTypes.STRING },
  TIPO_DEPTO: { type: DataTypes.NUMBER },
  CODDEPTO: { type: DataTypes.NUMBER },
  TIPO_MUNICIPIO: { type: DataTypes.NUMBER },
  CODMUNICIPIO: { type: DataTypes.NUMBER },
  ENT_SEXO: { type: DataTypes.NUMBER },
  DAT_DTO_SEXO: { type: DataTypes.NUMBER },
  DOCALTERNO: { type: DataTypes.NUMBER },
  NRO_FAVORITO: { type: DataTypes.NUMBER },
  VERSION: { type: DataTypes.NUMBER },
  CCOSTO: { type: DataTypes.NUMBER },
  MAIL: { type: DataTypes.STRING }
}, {
  tableName: "gamble.clientes",
  sequelize: oracleDB,
  timestamps: false,
})

export { Cliente }