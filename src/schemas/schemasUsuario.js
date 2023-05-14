const joi = require('joi');

const schemasPreguntas = joi.object({
    nombre: joi.string().min(1).max(112).required().regex(/^[a-zA-Z0-9]*$/),
    codigo: joi.number().integer().min(1150000).max(11599999).required(),
    correo: joi.string().email({ tlds: { allow: ['edu.co'] } }).regex(/@ufps\.edu\.co$/).required(),
    contrasena: Joi.string().min(8).required(50).required(),
    pcontrasena: Joi.string().valid(Joi.ref('password')).required()
});