const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad1', requireLogin, async (req,res) =>{
  res.render('page-unidad11');
});

module.exports = router;