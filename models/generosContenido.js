const {sequelize}= require ('../conexion/database.js')
const {DataTypes}=require('sequelize')

const GenerosContenido=sequelize.define('gneros_contenido',{
    idGenConte:{
        type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false,
    },
    Contenido_Id:{
        type:DataTypes.INTEGER,
         allowNull: false,

    },
    Genero_ID:{
        type:DataTypes.INTEGER,
         allowNull: false,
         

    },
       
},
{
    tableName: 'gneros_contenido',
    timestamps: false,
      
  })
module.exports={GenerosContenido}