const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/unidad14', requireLogin, async (req,res) =>{
  res.render('page-unidad14');
});

module.exports = router;