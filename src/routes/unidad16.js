const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad16', requireLogin,  async (req,res) =>{
  res.render('page-unidad16');
});

module.exports = router;