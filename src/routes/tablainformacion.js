const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireLogin = require('../lib/requireLogin');

router.get('/tablainfopersonal',  requireLogin,  async (req,res) =>{
  const usuario = await pool.query('SELECT * FROM usuario');
  res.render('page-tablainformacionpersonal',  { usuario });
});

module.exports = router;  