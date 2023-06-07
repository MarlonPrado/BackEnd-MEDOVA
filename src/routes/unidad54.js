const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad54', requireLogin,  async (req,res) =>{
  res.render('page-unidad54');
});

module.exports = router;