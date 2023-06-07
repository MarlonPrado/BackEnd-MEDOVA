const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad52', requireLogin,  async (req,res) =>{
  res.render('page-unidad52');
});

module.exports = router;