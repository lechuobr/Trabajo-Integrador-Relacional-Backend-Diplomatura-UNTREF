// Model for Contenido
const {sequelize}= require ('../conexion/database.js')
const {DataTypes}=require('sequelize')

const contenido=sequelize.define('contenido',{
   Contenido_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  Temporada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 1,
  },
  Resumen: {
    type: DataTypes.STRING(512),
    allowNull: false,
      },
  Poster: {
    type: DataTypes.STRING(30),
    allowNull: false,
      },
  Genero_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
      },
  idCategori: {
    type: DataTypes.INTEGER,
    allowNull: false,
      },
    Trailer: {
    type: DataTypes.STRING(50),
    allowNull: false,
    default: 0,
    }  ,
   busqueda: {
    type: DataTypes.STRING(512),
    allowNull: false,
    default: 1,
  },
  Duracion: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    default: 0,
  },
},
{
  tableName: 'contenido',
  timestamps: false,
    
})

module.exports={contenido}
  