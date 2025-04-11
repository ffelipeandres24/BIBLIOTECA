 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('biblioteca', 'root', 'andres24', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
