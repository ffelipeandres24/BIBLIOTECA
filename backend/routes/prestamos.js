const express = require('express');
const router = express.Router();
const {
  getAllPrestamos,
  crearPrestamo,
  actualizarPrestamo
} = require('../controllers/prestamoController');

// Rutas
router.get('/', getAllPrestamos);
router.post('/', crearPrestamo);
router.put('/:id', actualizarPrestamo);

module.exports = router;
