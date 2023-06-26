const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad31', requireLogin, async (req, res) => {
 const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser, parametro: parametro, parametro2: parametro2, parametro3: parametro3, parametro4: parametro4, parametro5: parametro5 } = req.userData;
  res.render('page-unidad31', { unombreuser, ucorreouser, uprogresouser, parametro, parametro2, parametro3, parametro4, parametro5 });
});

module.exports = router;
