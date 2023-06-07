const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad56', requireLogin,  async (req,res) =>{
  res.render('page-unidad56');
});

module.exports = router;