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
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  temporada: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:'N/A',
  },
  resumen: {
    type: DataTypes.STRING(1000),
    allowNull: false,
      },
  
  poster: {
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
    trailer: {
    type: DataTypes.STRING(50),
    allowNull: false,
    default: 0,
    }  ,
   busqueda: {
    type: DataTypes.STRING(512),
    allowNull: false,
    default: 1,
  },
  duracion: {
    type: DataTypes.STRING(10),
    allowNull: true,
    default: 0,
  },
},
{
  tableName: 'contenido',
  timestamps: false,
    
})


module.exports={contenido}
  