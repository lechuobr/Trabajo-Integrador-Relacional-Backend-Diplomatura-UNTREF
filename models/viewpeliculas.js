// Model for Contenido
const {sequelize}= require ('../conexion/database.js')
const {DataTypes}=require('sequelize')

const viewpelis=sequelize.define('peliculas',{
   ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    
  },
  titulo: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  Temporada: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:'N/A',
  },
  Resumen: {
    type: DataTypes.STRING(512),
    allowNull: false,
      },
   Poster: {
    type: DataTypes.STRING(30),
    allowNull: false,
      },
   genero: {
    type: DataTypes.TEXT,
    allowNull: false,
      },
    Categoria: {
    type: DataTypes.STRING(15),
    allowNull: false,
      },
    busqueda: {
        type: DataTypes.STRING(512),
        allowNull: false,
        default: 1,
      },
    Trailer: {
    type: DataTypes.STRING(50),
    allowNull: false,
    default: 0,
    }  ,
   Duracion: {
    type: DataTypes.STRING(10),
    allowNull: true,
    default: 0,
  },
  Reparto: {
    type: DataTypes.TEXT,
    allowNull: true,
    default: 0,
  },
},
{
  tableName: 'peliculas',
  timestamps: false,
    
})

module.exports={viewpelis}