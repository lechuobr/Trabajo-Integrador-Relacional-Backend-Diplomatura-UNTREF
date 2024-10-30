// Model for Actor
const {DataTypes} = require ('sequelize');
const {sequelize}=require('../conexion/database.js')

const Actor= sequelize.define('actor',{
     Actor_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ActorName: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
          
  },
  {
    tableName: 'actor',
    timestamps: false,
      
})

module.exports={Actor};

    