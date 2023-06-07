const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad44eva', requireLogin,  async (req,res) =>{
  res.render('page-unidad44eva');
});

module.exports = router;