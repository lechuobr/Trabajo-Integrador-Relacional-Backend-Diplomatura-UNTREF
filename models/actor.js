// Model for Actor
const {DataTypes} = require ('sequelize');
const {sequelize}=require('../conexion/database.js')

const Actor= sequelize.define('actor',{
     Actor_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Actor_Name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
          
  },
  {
    tableName: 'actor',
    timestamps: false,
      
})

module.exports={Actor};

    