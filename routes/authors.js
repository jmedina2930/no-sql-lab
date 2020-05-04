/*
Trabajo Nosql Bases de datos
Integrantes:
Cristian David Ayala Pulgarin
Cc: 1.038.120.364
Neiver Tapia Escobar
Cc: 1.020.482.757
*/


const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET Authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
Realizar los métodos (Endpoints) 
adicionales para las siguientes consultas:
Primer punto del taller
*/
router.get('/publicaciones-mayores-20', async (req, res) => {
  try {
    let filters = {};
    console.log(req.query);
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({publicados: {$gte:20}, pais:'Colombia'});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
Segunto punto del taller
Consultar los nombres de los autores que 
no tengan apellido en la base de datos.
*/
router.get('/sin-apellido', async(req, res)=>{
  try{
    let filters={}
    console.log(req.query);
    if(req.query.pais) filters= {pais: req.query.pais}
    const authors= await Author.find({apellido: ''});
    res.json(authors);
  }catch(err){
    res.status(500).json({message: err.message});
  }
});

/*
Tercer punto del taller
Consultar los apellidos de los autores que tengan
 menos de 20 publicaciones o que su país sea Argentina.
 */
 router.get('/publicaciones-menores-20', async (req, res) => {
  try {
    let filters = {};
    console.log(req.query);
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({publicados: {$lte:20}, pais:'Argentina'});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
