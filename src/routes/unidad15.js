const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad15', requireLogin, async (req,res) =>{
  res.render('page-unidad15');
});

module.exports = router;