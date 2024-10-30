const {sequelize}= require ('../conexion/database.js')
const {DataTypes}=require('sequelize')

const contenidoActor=sequelize.define('contenido_actor',{
    id_conT_Actor:{
        type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false,
    },
    Actor_Id:{
        type:DataTypes.INTEGER,
         allowNull: false,

    },
    Contenido_Id:{
        type:DataTypes.INTEGER,
         allowNull: false,
         

    },
       
},
{
    tableName: 'contenido_actor',
    timestamps: false,
      
  })
module.exports={contenidoActor}