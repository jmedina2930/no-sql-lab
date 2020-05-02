const express = require('express');
const Author = require('../models/author');

// AUTOR: CARLOS ALBERTO SÁNCHEZ ALZATE. C.C. 71.776.428

const router = express.Router();
//Original:
router.get('/', async (req, res) => {
  try {
    let filters = {};
    console.log(req.query);
    if (req.query.pais) filters = {pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Consultar los nombres y los apellidos de los autores que tengan publicaciones superiores o iguales a 20 
  //y su país sea Colombia.
router.get('/colombianoand_pub20', async (req, res) => {
  try {
    let filters = {};
    const authors = await Author.find({publicados: {$gte:20}, pais: 'Colombia' });
    
    //Como solo estan solicitando los Nombres y Apellidos entonces se filtran los resultados:
    const result = authors
    .map(({ nombre, apellido }) => ({
      nombre,apellido
    }));
  
    //Respuesta:
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Consultar los nombres de los autores que no tengan apellido en la base de datos.
router.get('/sinapellido', async (req, res) => {
  try {
    let filters = {};
    const authors = await Author.find({apellido: null });
    
    //Como solo estan solicitando los Nombres entonces se filtran los resultados:
    const result = authors
      .map(({ nombre }) => ({
        nombre,
      }));
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Consultar los apellidos de los autores que tengan menos de 20 publicaciones o que su país sea Argentina.
router.get('/Argentinosor_pub_l_20', async (req, res) => {
  try {
    let filters = {};
    const authors = await Author.find({$or:[{publicados: {$lt:20}},{pais: 'Argentina'} ]});
    
    //Como solo estan solicitando los Apellidos entonces se filtran los resultados 
    const result = authors
      .map(({ apellido }) => ({
        apellido,
      }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Original:
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
