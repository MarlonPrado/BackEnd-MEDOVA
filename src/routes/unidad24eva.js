const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad24eva', requireLogin,  async (req,res) =>{
  res.render('page-unidad24eva');
});

module.exports = router;