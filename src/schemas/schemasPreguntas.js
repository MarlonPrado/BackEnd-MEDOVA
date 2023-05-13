const joi = require('joi');

const schemasPreguntas = joi.object({
    dificultad: joi.number().min(1).max(3).required(),

    tipoPregunta: joi.string().regex(/^[a-zA-Z0-9]*$/).valid('SELECTUNIC', 'SELECTMULTI').regex(/^[a-zA-Z0-9]*$/).required(),

    enunciado: joi.string().min(1).max(1024).required(),

    opciona: joi.string().min(1).max(112).required().regex(/^[a-zA-Z0-9]*$/),

    opcionb: joi.string().min(1).max(112).invalid(joi.ref('opciona')).required(),

    opcionc: joi.string().min(1).max(112).invalid(joi.ref('opciona'),joi.ref('opcionb')).required(),

    opciond: joi.string().min(1).max(112).invalid(joi.ref('opciona'),joi.ref('opcionb'),joi.ref('opcionc')).required(),

    respuestaCorrecta: joi.string().when('tipoPregunta', {
        is: joi.exist().valid('SELECTUNIC'),
        then: joi.string().valid((joi.ref('opciona')), (joi.ref('opcionb')), (joi.ref('opcionc')), (joi.ref('opciond')))
        .invalid(joi.ref('opcionA'), joi.ref('opcionB'), joi.ref('opcionC')),
        otherwise: joi.forbidden()
    }),

    retroalimentacion: joi.string().min(1).max(1024).required()
});


module.exports =  schemasPreguntas; 