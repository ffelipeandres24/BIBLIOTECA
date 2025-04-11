const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

router.post('/', async (req, res) => {
  const nuevo = await Usuario.create(req.body);
  res.json(nuevo);
});

router.delete('/:id', async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
