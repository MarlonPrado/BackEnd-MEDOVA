const express = require('express');
const router = express.Router();
const pool = require('../db');
const schemasPreguntas =  require('../schemas/schemasPreguntas');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const requireLogin = require('../lib/requireLogin');


//Banco de Preguntas - Modulo de inserccion de Preguntas
//Mostrar el formulario de preguntas
router.get('/unidadUnoAgregar', requireLogin, (req,res) =>{
    res.render('page-bancopreguntas');
})

//Inserta una nueva pregunta
router.post('/unidadUnoAgregar',  requireLogin,  async (req,res) =>{

    try{
        
    function obtenerRespuesta(indice) {
            const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
            const respuesta = opcion[indice - 1];
            return respuesta;
          }
    
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const preguntaValidacion = {
     
        dificultad, 
        tipoPregunta,   
        enunciado, 
        opciona,
        opcionb,
        opcionc,
        opciond,
        respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
        retroalimentacion
    }
    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/unidadUnoAgregar');
    }
    else {

        const nuevaPregunta = {
            idEvaAsoc: 1,
            dificultad, 
            tipoPregunta, 
            enunciado,  
            opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond,
            respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
            retroalimentacion
        }
    
  

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    req.flash('success', 'Listado de Preguntas cargado exitosamente')
    res.redirect('/bancoPreguntas1');
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

//Consulta todas las preguntas de la base de datos
router.get('/bancoPreguntas1',  requireLogin,  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 1');
    
    
    res.render('respuestaslist', {pregunta });
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Consulta una pregunta especifica del banco de  Preguntas
router.get('/bancoPreguntas1/:id',    requireLogin,  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        const pregunta =  await pool.query('SELECT * FROM pregunta WHERE idpregunta  = ?', [id]);
        
       
        
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Eliminar una pregunta del banco de  Preguntas
router.get('/eliminarPregunta/:id',   requireLogin,  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        const busqueda = await pool.query('SELECT idEvaAsoc FROM pregunta WHERE idpregunta  = ?', [id]);
        const pregunta = await pool.query('DELETE FROM pregunta WHERE idpregunta  = ?', [id]);
        
        const value = pregunta.affectedRows
        if(value==1){
            console.log(busqueda) 
            req.flash('success', 'Pregunta eliminada con exito')
            if(busqueda[0].idEvaAsoc==1){
                console.log("entro aqui")
                res.redirect('/bancoPreguntas1');
            }
            else if(busqueda[0].idEvaAsoc==2){
                res.redirect('/bancoPreguntas2');
            }
            else if(busqueda[0].idEvaAsoc==3){
                res.redirect('/bancoPreguntas3');
            }
            else if(busqueda[0].idEvaAsoc==4){
                res.redirect('/bancoPreguntas4');
            }
            else if(busqueda[0].idEvaAsoc==5){
                res.redirect('/bancoPreguntas5');
            }
        }
        else{
            req.flash('error', 'Pregunta con id: ' + id + ' no existe en la base de datos')
            res.redirect('/bancoPreguntas1');
        }
    }
    

catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Obtener el objeto de una pregunta para editar en un formulario
router.get('/editarPregunta/:id',  requireLogin,  async (req,res) =>{
    try{
        
      
        const preguntas = await pool.query('SELECT * FROM pregunta WHERE idpregunta  = ?', [id]);
        if(JSON.stringify(preguntas)=="[]"){
            res.status(400).send("No existe dicha pregunta en la base de datos")
        }
        else{
        //res.render('evaluaciones/evaluacion1_Edit.hbs', {preguntas: preguntas[0]});
        res.status(200).send({preguntas: preguntas[0]});
        }
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}}) 

//Actualizar la pregunta
router.post('/editarPregunta/:id',  requireLogin,  async (req,res) =>{

    try{

        const id = req.params.id;
        
        
        const busqueda = await pool.query('SELECT idEvaAsoc FROM pregunta WHERE idpregunta  = ?', [id]);
       
    function obtenerRespuesta(indice) {     
        const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
        const respuesta = opcion[indice - 1];
        return respuesta;
      }

      const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
      const preguntaValidacion = {
       
          dificultad, 
          tipoPregunta,   
          enunciado, 
          opciona,
          opcionb,
          opcionc,
          opciond,
          respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
          retroalimentacion
      }
let eva = 0;
      if(busqueda[0].idEvaAsoc==1){
       eva=1
    }
    else if(busqueda[0].idEvaAsoc==2){
        eva=2
    }
    else if(busqueda[0].idEvaAsoc==3){
        eva=3
    }
    else if(busqueda[0].idEvaAsoc==4){
        eva=4
    }
    else if(busqueda[0].idEvaAsoc==5){
        eva=5
    }

    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/bancoPreguntas'  + eva );
    }
    else {
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const nuevaPregunta = {
        idEvaAsoc: eva ,
        dificultad, 
        tipoPregunta, 
        enunciado, 
        opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond, 
        respuestaCorrecta, 
        retroalimentacion
    }

    
    await pool.query('UPDATE pregunta SET ?  WHERE idpregunta  = ?', [nuevaPregunta, id])
    req.flash('success', 'Preguntas actualizado exitosamente')
    
    
    if(busqueda[0].idEvaAsoc==1){
        res.redirect('/bancoPreguntas1');
    }
    else if(busqueda[0].idEvaAsoc==2){
        res.redirect('/bancoPreguntas2');
    }
    else if(busqueda[0].idEvaAsoc==3){
        res.redirect('/bancoPreguntas3');
    }
    else if(busqueda[0].idEvaAsoc==4){
        res.redirect('/bancoPreguntas4');
    }
    else if(busqueda[0].idEvaAsoc==5){
        res.redirect('/bancoPreguntas5');
    }
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})






router.get('/unidadTresAgregar', requireLogin, (req,res) =>{
    res.render('page-bancopreguntas3');
})  




router.post('/unidadTresAgregar',  requireLogin,  async (req,res) =>{

    try{
        
    function obtenerRespuesta(indice) {
            const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
            const respuesta = opcion[indice - 1];
            return respuesta;
          }
          
    
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const preguntaValidacion = {
     
        dificultad, 
        tipoPregunta,   
        enunciado, 
        opciona,
        opcionb,
        opcionc,
        opciond,
        respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
        retroalimentacion
    }
    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/unidadTresAgregar');
    }
    else {

        const nuevaPregunta = {
            idEvaAsoc: 3,
            dificultad, 
            tipoPregunta, 
            enunciado,  
            opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond,
            respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
            retroalimentacion
        }
    
  

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    req.flash('success', 'Listado de Preguntas cargado exitosamente')
    res.redirect('/bancoPreguntas3');
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

router.get('/bancoPreguntas3',  requireLogin,  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 3');
    
    
    res.render('respuestaslist3', {pregunta });
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  







router.get('/unidadDosAgregar', requireLogin, (req,res) =>{
    res.render('page-bancopreguntas2');
})  




router.post('/unidadDosAgregar',  requireLogin,  async (req,res) =>{

    try{
        
    function obtenerRespuesta(indice) {
            const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
            const respuesta = opcion[indice - 1];
            return respuesta;
          }
          
    
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const preguntaValidacion = {
     
        dificultad, 
        tipoPregunta,   
        enunciado, 
        opciona,
        opcionb,
        opcionc,
        opciond,
        respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
        retroalimentacion
    }
    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/unidadDosAgregar');
    }
    else {

        const nuevaPregunta = {
            idEvaAsoc: 2,
            dificultad, 
            tipoPregunta, 
            enunciado,  
            opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond,
            respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
            retroalimentacion
        }
    
  

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    req.flash('success', 'Listado de Preguntas cargado exitosamente')
    res.redirect('/bancoPreguntas2');
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

router.get('/bancoPreguntas2',  requireLogin,  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 2');
    
    
    res.render('respuestaslist2', {pregunta });
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  









router.get('/unidadCuatroAgregar', requireLogin, (req,res) =>{
    res.render('page-bancopreguntas4');
})  




router.post('/unidadCuatroAgregar',  requireLogin,  async (req,res) =>{

    try{
        
    function obtenerRespuesta(indice) {
            const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
            const respuesta = opcion[indice - 1];
            return respuesta;
          }
          
    
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const preguntaValidacion = {
     
        dificultad, 
        tipoPregunta,   
        enunciado, 
        opciona,
        opcionb,
        opcionc,
        opciond,
        respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
        retroalimentacion
    }
    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/unidadCuatroAgregar');
    }
    else {

        const nuevaPregunta = {
            idEvaAsoc: 4,
            dificultad, 
            tipoPregunta, 
            enunciado,  
            opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond,
            respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
            retroalimentacion
        }
    
  

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    req.flash('success', 'Listado de Preguntas cargado exitosamente')
    res.redirect('/bancoPreguntas4');
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

router.get('/bancoPreguntas4',  requireLogin,  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 4');
    
    
    res.render('respuestaslist4', {pregunta });
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  





router.get('/unidadQuintoAgregar', requireLogin, (req,res) =>{
    res.render('page-bancopreguntas5');
})  




router.post('/unidadQuintoAgregar',  requireLogin,  async (req,res) =>{

    try{
        
    function obtenerRespuesta(indice) {
            const opcion = [req.body.opciona, req.body.opcionb, req.body.opcionc, req.body.opciond];
            const respuesta = opcion[indice - 1];
            return respuesta;
          }
          
    
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const preguntaValidacion = {
     
        dificultad, 
        tipoPregunta,   
        enunciado, 
        opciona,
        opcionb,
        opcionc,
        opciond,
        respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
        retroalimentacion
    }
    
    const { error } = schemasPreguntas.validate(preguntaValidacion) ;
    if (error) {
        req.flash('error', error.details[0].message);
        res.redirect('/unidadQuintoAgregar');
    }
    else {

        const nuevaPregunta = {
            idEvaAsoc: 5,
            dificultad, 
            tipoPregunta, 
            enunciado,  
            opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond,
            respuestaCorrecta: obtenerRespuesta(req.body.respuestaCorrecta), 
            retroalimentacion
        }
    
  

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    req.flash('success', 'Listado de Preguntas cargado exitosamente')
    res.redirect('/bancoPreguntas5');
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

router.get('/bancoPreguntas5',  requireLogin,  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta WHERE idEvaAsoc = 5');
    
    
    res.render('respuestaslist5', {pregunta });
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  







module.exports = router;