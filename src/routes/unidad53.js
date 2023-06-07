const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad53', requireLogin,  async (req,res) =>{
  res.render('page-unidad53');
});

module.exports = router;