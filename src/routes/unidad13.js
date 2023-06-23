const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad13', requireLogin, (req, res) => {
  const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser } = req.userData;
  res.render('page-unidad13', { unombreuser, ucorreouser, uprogresouser });
});

module.exports = router;
