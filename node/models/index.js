/*const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.handymen = require("./caraval.model.js")(sequelize, Sequelize);
module.exports = db;
*/
const mysql = require('mysql2');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "caraval",
});

conn.connect();

module.exports = conn;
