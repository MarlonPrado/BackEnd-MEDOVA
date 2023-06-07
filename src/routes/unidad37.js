const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad37', requireLogin,  async (req,res) =>{
  res.render('page-unidad37');
});

module.exports = router;