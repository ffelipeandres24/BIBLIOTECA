const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', require('./routes/usuarios'));
app.use('/libros', require('./routes/libros'));
app.use('/prestamos', require('./routes/prestamos'));

// Conectar DB y lanzar servidor
sequelize.sync({ alter: true }).then(() => {
  app.listen(3001, () => {
    console.log('Servidor backend escuchando en http://localhost:3001');
  });
});
