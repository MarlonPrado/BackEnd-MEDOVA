const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireLogin = require('../lib/requireLogin');

router.get('/vistas', requireLogin, async (req, res) => {
  try {
    const respuestas = await pool.query('SELECT * FROM respuesta');
    res.render('vistas', { respuestas });
  } catch (error) {
    console.error(error);
    res.send("ERROR EN LA PETICION" + error);
  }
});

module.exports = router;
