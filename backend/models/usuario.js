module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
      nombre: { type: DataTypes.STRING, allowNull: false },
      correo: { type: DataTypes.STRING, allowNull: false, unique: true },
      telefono: DataTypes.STRING
    });
  };
  