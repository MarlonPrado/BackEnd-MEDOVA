const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad35', requireLogin,  async (req,res) =>{
  res.render('page-unidad35');
});

module.exports = router;