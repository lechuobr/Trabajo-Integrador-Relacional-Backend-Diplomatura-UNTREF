// Model for Genero
const {sequelize}=require ('../conexion/database.js')
const {DataTypes}=require('sequelize')
const Genero=sequelize.define('generos',{
  Genero_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Genero_Name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  
},
{
  tableName: 'generos',
  timestamps: false,
    
})

module.exports={Genero}
  