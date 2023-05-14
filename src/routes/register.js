const express = require('express');
const router = express.Router();
const pool = require('../db');
 
router.get('/registro', (req,res) =>{
    res.render('registro');
})

router.post('/registro', (req,res) =>{
    console.log(req.body)
})

module.exports = router;