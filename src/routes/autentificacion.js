const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/iniciarsesion', ( req,res ) => {
    res.render('login');
}
) 
 
module.exports = router;