const{Sequelize}=require ('sequelize');
const dotenv=require('dotenv')
const ENV=process.env.NODE_ENV  || 'local'
dotenv.config({path:`.env.${ENV}`})


const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DBUSER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      port: process.env.PORT,
      dialect:'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 100000, 
        idle: 10000
      },
      dialectOptions: {
        connectTimeout: 100000 
      },
      logging: console.log
    }
  );

console.log('DATABASE:', process.env.DATABASE);
console.log('DBUSER:', process.env.DBUSER);
console.log('PASSWORD:', process.env.PASSWORD);
console.log('HOST:', process.env.HOST);
console.log('PORT:', process.env.PORT);

module.exports={sequelize}
    
