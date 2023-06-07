const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad55', requireLogin,  async (req,res) =>{
  res.render('page-unidad55');
});

module.exports = router;