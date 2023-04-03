const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/unidadUnoAgregar', (req,res) =>{
    res.render('evaluaciones/evaluacion1_Add.hbs');
})
router.get('/bancoPreguntas1', (req,res) =>{
    res.render('evaluaciones/evaluacion1_List.hbs');
})

module.exports = router;