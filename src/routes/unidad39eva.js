const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad39eva', requireLogin,  async (req,res) =>{
  
  res.render('page-unidad39eva');
});

module.exports = router;