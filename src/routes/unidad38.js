const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad38', requireLogin,  async (req,res) =>{
  res.render('page-unidad38');
});

module.exports = router;