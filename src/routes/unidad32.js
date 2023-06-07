const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad32', requireLogin, async (req,res) =>{
  res.render('page-unidad32');
});

module.exports = router;