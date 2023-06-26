const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad1', requireLogin, (req, res) => {
  const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser, parametro: parametro } = req.userData;
  console.log("Parametro: " + parametro);
  // Utiliza los valores de unombreuser, ucorreouser y uprogresouser como necesites
  res.render('page-unidad11', { unombreuser, ucorreouser, uprogresouser,parametro });
});

router.get('/zonaPruebas', requireLogin, (req, res) => {
 const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser, parametro: parametro, parametro2: parametro2, parametro3: parametro3, parametro4: parametro4, parametro5: parametro5 } = req.userData;
  // Utiliza los valores de unombreuser, ucorreouser y uprogresouser como necesites
  res.render('page-test', { unombreuser, ucorreouser, uprogresouser, parametro, parametro2, parametro3, parametro4, parametro5 });
});


module.exports = router;
