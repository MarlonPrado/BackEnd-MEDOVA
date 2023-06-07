const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad33', requireLogin,  async (req,res) =>{
  res.render('page-unidad33');
});

module.exports = router;