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
        acquire: 60000, // Aumenta el tiempo de espera de adquisición a 60 segundos
        idle: 10000
      },
      dialectOptions: {
        connectTimeout: 60000 // Aumenta el tiempo de espera de conexión a 60 segundos
      },
      logging: false // Opcional: desactiva el registro de consultas SQL en consola
    }
  );

console.log('DATABASE:', process.env.DATABASE);
console.log('DBUSER:', process.env.DBUSER);
console.log('PASSWORD:', process.env.PASSWORD);
console.log('HOST:', process.env.HOST);
console.log('PORT:', process.env.PORT);

module.exports={sequelize}
    
