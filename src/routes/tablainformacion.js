const express = require('express');
const router = express.Router();


router.get('/tablainfopersonal', async (req,res) =>{
  res.render('page-tablainformacionpersonal');
});

module.exports = router;