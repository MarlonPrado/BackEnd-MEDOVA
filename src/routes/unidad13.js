const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad13', requireLogin,  async (req,res) =>{
  res.render('page-unidad13');
});

module.exports = router;