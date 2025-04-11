 
const express = require('express');
const router = express.Router();
const { Libro } = require('../models');

router.get('/', async (req, res) => {
  const libros = await Libro.findAll();
  res.json(libros);
});

router.post('/', async (req, res) => {
  const nuevo = await Libro.create(req.body);
  res.json(nuevo);
});

router.delete('/:id', async (req, res) => {
  await Libro.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
