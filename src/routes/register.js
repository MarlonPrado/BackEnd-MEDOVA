const express = require('express');
const router = express.Router();
const pool = require('../db');
 
router.get('/registro', (req,res) =>{
    res.render('/login/registro');
})

module.exports = router;