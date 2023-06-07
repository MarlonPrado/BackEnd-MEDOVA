const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad34', requireLogin,  async (req,res) =>{
  res.render('page-unidad34');
});

module.exports = router;