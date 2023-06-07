const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad31', requireLogin, async (req,res) =>{
  res.render('page-unidad31');
});

module.exports = router;