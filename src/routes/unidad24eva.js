const pool = require('../db');
const express = require('express');
const requireLogin = require('../lib/requireLogin');
const router = express.Router();


router.get('/unidad24eva', requireLogin, async (req, res) => {
  try {
    const { nombre: unombreuser, correo: ucorreouser, progreso: uprogresouser, parametro: parametro, parametro2: parametro2, parametro3: parametro3, parametro4: parametro4, parametro5: parametro5 } = req.userData;
 
     const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 2 ORDER BY RAND() LIMIT 5');
   
     res.render('page-unidad24eva', { unombreuser, ucorreouser, uprogresouser, pregunta, parametro, parametro2, parametro3, parametro4, parametro5});
   } catch (error) {
     console.error(error);
     res.send("ERROR EN LA PETICION" + error);
   }
 });

module.exports = router;
