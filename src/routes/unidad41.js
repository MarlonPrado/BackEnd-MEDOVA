const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad41', requireLogin,  async (req,res) =>{
  res.render('page-unidad41');
});

module.exports = router;