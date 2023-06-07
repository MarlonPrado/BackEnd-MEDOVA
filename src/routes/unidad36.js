const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad36', requireLogin,  async (req,res) =>{
  res.render('page-unidad36');
});

module.exports = router;