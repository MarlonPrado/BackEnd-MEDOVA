const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad1', requireLogin, (req, res) => {
  const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser } = req.userData;
  // Utiliza los valores de unombreuser, ucorreouser y uprogresouser como necesites
  res.render('page-unidad11', { unombreuser, ucorreouser, uprogresouser });
});

module.exports = router;
