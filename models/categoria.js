// Model for Categoria
const {sequelize}=require ('../conexion/database.js')
const {DataTypes}=require('sequelize')
const Categoria=sequelize.define('categorias',{
IdCategori: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Categori_Name: {
    type: DataTypes.STRING(15),
    allowNull: false,
 
}},

{
  tableName: 'categorias',
  timestamps: false,
    
})

module.exports={Categoria};
