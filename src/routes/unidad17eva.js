const pool = require('../db');
const express = require('express');
const requireLogin = require('../lib/requireLogin');
const router = express.Router();


router.get('/unidad17eva', requireLogin,  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 1 ORDER BY RAND() LIMIT 5');
    console.log(pregunta);

    res.render('page-unidad17eva', {pregunta});
}

catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
    }});

module.exports = router;