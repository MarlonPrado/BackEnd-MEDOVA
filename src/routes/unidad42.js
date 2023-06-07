const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad42', requireLogin,  async (req,res) =>{
  res.render('page-unidad42');
});

module.exports = router;