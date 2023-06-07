const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad12', requireLogin, async (req,res) =>{
  res.render('page-unidad12');
});

module.exports = router;