const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');

router.get('/infopersonal',  requireLogin, async (req,res) =>{
  res.render('page-informacionpersonal');
});

module.exports = router;