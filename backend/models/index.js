 
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
const Libro = require('./libro')(sequelize, Sequelize.DataTypes);
const Prestamo = require('./prestamo')(sequelize, Sequelize.DataTypes);

// Relaciones
Usuario.hasMany(Prestamo, { foreignKey: 'usuario_id' });
Prestamo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Libro.hasMany(Prestamo, { foreignKey: 'libro_id' });
Prestamo.belongsTo(Libro, { foreignKey: 'libro_id' });

module.exports = { sequelize, Usuario, Libro, Prestamo };
