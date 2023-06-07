const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad21',  requireLogin, async (req,res) =>{
  res.render('page-unidad21');
});

module.exports = router;