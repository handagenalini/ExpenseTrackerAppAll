const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker1','root','handage@12',{dialect:'mysql',host:'localhost'}
);

module.exports =sequelize;