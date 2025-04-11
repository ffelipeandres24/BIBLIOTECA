 
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Prestamo', {
      fecha_prestamo: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_devolucion: DataTypes.DATEONLY,
      estado: {
        type: DataTypes.ENUM('prestado', 'devuelto'),
        defaultValue: 'prestado'
      }
    });
  };
  