const Joi = require('joi');

const schemasPreguntas = Joi.object({
    nombre: Joi.string().min(1).max(112).required().regex(/^[a-zA-Z0-9]*$/),
    codigo: Joi.number().integer().min(1150000).max(11599999).required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).required(50).required(),
    ppassword: Joi.string().valid(Joi.ref('password')).required(),
    rol: Joi.number().valid(0,1).required()
});

module.exports= schemasPreguntas;