const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad51', requireLogin,  async (req,res) =>{
  res.render('page-unidad51');
});

module.exports = router;