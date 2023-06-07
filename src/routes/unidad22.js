const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad22', requireLogin,  async (req,res) =>{
  res.render('page-unidad22');
});

module.exports = router;