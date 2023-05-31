// const Sequelize = require('sequelize');

// const dotenv = require('dotenv');


// dotenv.config();



// const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_R,process.env.DB_PASS,{dialect:'mysql',host:process.env.DB_HOST}
// );

// module.exports =sequelize;
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = callback => {
//   MongoClient.connect(
//     'mongodb://atlas-sql-64720c14ff83873ec168cb41-mqbnk.a.query.mongodb.net/sample_airbnb?ssl=true&authSource=admin'
//   )
//     .then(client => {
//       console.log('Connected!');
//       _db = client.db();
//       callback();
//     })
//     .catch(err => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;