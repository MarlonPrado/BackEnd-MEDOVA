const express = require('express');
const router = express.Router();
const pool = require('../db');
const schemasPreguntas =  require('../schemas/schemasPreguntas');
const joi = require('joi');

//Banco de Preguntas - Modulo de inserccion de Preguntas
//Mostrar el formulario de preguntas
router.get('/unidadUnoAgregar', (req,res) =>{
    res.render('evaluaciones/evaluacion1_Add.hbs');
})

//Inserta una nueva pregunta
router.post('/EnviarRespuesta1', async (req,res) =>{

    try{
        const validator =  await pool.query ('SELECT opcion, idpregunta FROM pregunta WHERE opcion = ? AND  idpregunta= ?  AND EXISTS ( SELECT * FROM estudiante WHERE idEstudiante = ?)', [req.body.valorRespuesta, req.body.idPreguntaAsociada, req.body.idEstudianteResponsable])
        if(JSON.stringify(validator)=="[]"){
            console.log("Esta opcion de respuesta es inexistente, no corresponde a una pregunta o el usuario no es un usuario con rol estudiante/admin")
        }
        else{   
            const validator =  await pool.query ('SELECT opcion FROM pregunta WHERE ? = respuestaCorrecta', [req.body.valorRespuesta])
            if(JSON.stringify(validator)=="[]"){
                console.log("Respuesta Incorrecta")
        }
        else{
            console.log("Respuesta Correcta")
        }
    }

    //const { error } = schemasPreguntas.validate(req.body) ;
    //if (error) {
    //  return res.status(400).json({ error: error.details[0].message });
    //}
    //else {
    //const {idrespuesta, valorRespuesta, estado, idPreguntaAsociada, idEstudianteResponsable} = req.body;
    //const nuevaPregunta = {
     //   idEvaAsoc: 1 ,
     //   dificultad, 
     //   tipoPregunta, 
     //   enunciado, 
      //  opcion: opciona + ";" + opcionb + ";" + opcionc + ";" + opciond, 
     //   respuestaCorrecta, 
    //    retroalimentacion
   // }

   // await pool.query('INSERT INTO pregunta set ?', [nuevaPregunta])
    
    
    }//}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    })

//Consulta todas las preguntas de la base de datos
router.get('/bancoPreguntas1',  async (req,res) =>{
    try{
    const pregunta = await pool.query('SELECT * FROM pregunta');
    console.log(pregunta);
    //res.render('evaluaciones/evaluacion1_List.hbs', {pregunta});
    res.send(pregunta);
}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Consulta una pregunta especifica del banco de  Preguntas
router.get('/bancoPreguntas1/:id',  async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        const pregunta =  await pool.query('SELECT * FROM pregunta WHERE idpregunta  = ?', [id]);
        console.log(pregunta);
        res.send(pregunta);
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
        const pregunta = await pool.query('DELETE FROM pregunta WHERE idpregunta  = ?', [id]);
        const value = pregunta.affectedRows
        if(value==1){
        res.send("Pregunta eliminada con exito")
        }
        else{
            res.send("Pregunta no existe en la base de datos")
        }
    }
    

catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}})  

//Obtener el objeto de una pregunta para editar en un formulario
router.get('/editarPregunta/:id',  async (req,res) =>{
    try{

        const id = req.params.id;
        console.log(id);
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
router.post('/editarPregunta/:id', async (req,res) =>{

    try{

    const { error } = schemasPreguntas.validate(req.body) ;
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    else {
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
    const id = req.params.id;
    console.log(id);
    await pool.query('UPDATE pregunta SET ?  WHERE idpregunta  = ?', [nuevaPregunta, id])
    res.send("Pregunta Actualizada de manera exitosa");
}}
catch(error){
    console.error(error)
    res.send("ERROR EN LA PETICION" + error)
}    
})

module.exports = router;