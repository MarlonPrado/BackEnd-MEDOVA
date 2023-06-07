const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad57', requireLogin,  async (req,res) =>{
  res.render('page-unidad57eva');
});

module.exports = router;