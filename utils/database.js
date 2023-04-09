const Sequelize = require('sequelize');

const dotenv = require('dotenv');


dotenv.config();



const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_R,process.env.DB_PASS,{dialect:'mysql',host:'localhost'}
);

module.exports =sequelize;