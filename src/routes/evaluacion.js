const express = require('express');
const router = express.Router();
const pool = require('../db');


//Banco de Preguntas - Modulo de inserccion de Preguntas
//Mostrar el formulario de preguntas
router.get('/unidadUnoAgregar', (req,res) =>{
    res.render('evaluaciones/evaluacion1_Add.hbs');
})

//Inserta una nueva pregunta
router.post('/unidadUnoAgregar', async (req,res) =>{

    try{
    const {ievasoc, dificultad, tipoPregunta, enunciado, opciona, opcionb, opcionc, opciond, respuestaCorrecta, retroalimentacion } = req.body;
    const nuevaPregunta = {
        idEvaAsoc: 1 ,
        dificultad, 
        tipoPregunta, 
        enunciado, 
        opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond, 
        respuestaCorrecta, 
        retroalimentacion
    }

    await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    res.send("Pregunta agregada de manera exitosa");
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

//Leer las preguntas de la base de datos
router.get('/bancoPreguntas1',  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta');
    console.log(pregunta);
    res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})    

//Eliminar una pregunta del banco de  Preguntas
router.get('/eliminarPregunta/:id',  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        await pool.query('DELETE FROM pregunta WHERE idpregunta  = ?', [id]);
        res.render('evaluaciones/evaluacion1_List.hbs');
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Actualizar una pregunta del banco de  Preguntas
router.get('/editarPregunta/:id',  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id);
        const preguntas = await pool.query('SELECT * FROM pregunta WHERE idpregunta  = ?', [id]);
        console.log(preguntas);
        res.render('evaluaciones/evaluacion1_Edit.hbs', {preguntas: preguntas[0]});
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}}) 

module.exports = router;