const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/infopersonal', requireLogin, async (req, res) => {
  const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser } = req.userData;
  res.render('page-informacionpersonal', { unombreuser, ucorreouser, uprogresouser });
});

module.exports = router;
