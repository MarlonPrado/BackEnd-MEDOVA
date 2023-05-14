const passport = require('passport')
const strategy = require('passport-local').Strategy;


passport.use=("local.iniciar-sesion", new Localstrategy:
    usserName:req.body.nombre,
    cc: req.body.codigoPregunta,
    correo: req.body.nombrcorreoe,
    contrasena: req.body.codigo,

)}