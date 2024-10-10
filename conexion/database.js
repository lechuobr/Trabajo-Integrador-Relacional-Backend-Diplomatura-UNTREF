const{Sequelize}=require('sequelize');
process.loadEnvFile();

const sequelize= new Sequelize(process.env.DATABASE,process.env.DBUSER,process.env.PASSWORD,{
host:process.env.HOST,
dialect:'mysql',pool:{
max:5,
min:0,
acquire:30000,
idle:10000
},
})

module.exports={sequelize}
    