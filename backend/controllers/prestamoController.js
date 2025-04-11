const { Prestamo, Usuario, Libro } = require('../models');

// Obtener todos los préstamos
const getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll({
      include: [Usuario, Libro]
    });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

// Crear un préstamo (validando usuario, libro y stock)
const crearPrestamo = async (req, res) => {
  try {
    const { usuario_id, libro_id, fecha_prestamo } = req.body;

    const usuario = await Usuario.findByPk(usuario_id);
    const libro = await Libro.findByPk(libro_id);

    if (!usuario || !libro) {
      return res.status(400).json({ error: 'Usuario o libro no encontrado' });
    }

    if (libro.stock < 1) {
      return res.status(400).json({ error: 'No hay stock disponible' });
    }

    const nuevoPrestamo = await Prestamo.create({
      usuario_id,
      libro_id,
      fecha_prestamo,
      estado: 'prestado'
    });

    libro.stock -= 1;
    await libro.save();

    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar préstamo' });
  }
};

// Actualizar estado del préstamo (devolver libro)
const actualizarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, fecha_devolucion } = req.body;

    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });

    // Si se marca como devuelto y antes estaba prestado, aumentar stock
    if (estado === 'devuelto' && prestamo.estado === 'prestado') {
      const libro = await Libro.findByPk(prestamo.libro_id);
      if (libro) {
        libro.stock += 1;
        await libro.save();
      }
    }

    prestamo.estado = estado || prestamo.estado;
    prestamo.fecha_devolucion = fecha_devolucion || prestamo.fecha_devolucion;
    await prestamo.save();

    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar préstamo' });
  }
};

module.exports = {
  getAllPrestamos,
  crearPrestamo,
  actualizarPrestamo
};
