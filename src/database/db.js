const Sequelize =  require('sequelize')
const { Pool } = require('pg');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,{
    host : process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
  
  
  
  //process.env.DB_PORT,
);

module.exports ={sequelize};