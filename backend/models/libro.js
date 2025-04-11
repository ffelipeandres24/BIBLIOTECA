 
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Libro', {
      titulo: { type: DataTypes.STRING, allowNull: false },
      autor: { type: DataTypes.STRING, allowNull: false },
      anio_publicacion: DataTypes.INTEGER,
      stock: { type: DataTypes.INTEGER, allowNull: false }
    });
  };
  