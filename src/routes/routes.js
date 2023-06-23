const express = require('express');
const router = express.Router();
const requireLogin = require('../lib/requireLogin');
const userInfo = require('../lib/userInfo')
router.use(userInfo);

router.get('/dashboard',requireLogin, (req, res ) => {
    if (req.userData) {
        const { nombre, correo } = req.userData;
        // Utiliza los valores de nombre y correo como necesites

        
        res.render('dashboard', { nombre, correo });
      } else {
        res.render('dashboard');
      }
})

module.exports = router;