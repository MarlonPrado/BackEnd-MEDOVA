const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad23', requireLogin, async (req,res) =>{
  res.render('page-unidad23');
});

module.exports = router;