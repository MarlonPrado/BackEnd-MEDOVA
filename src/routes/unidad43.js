const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad43', requireLogin,  async (req,res) =>{
  res.render('page-unidad43');
});

module.exports = router;