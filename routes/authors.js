const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
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

/**
 * 1. Consultar los nombres y los apellidos de los autores que tengan publicaciones superiores 
 * o iguales a 20 y su país sea Colombia.
 */
router.get('/pub20Colombia', async (req, res) => {
  try {
    const result = await Author.find( {pais:"Colombia", publicados:{$gte:20}},{nombre:1,apellido:1, _id : 0 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * 2. Consultar los nombres de los autores que no tengan apellido en la base de datos.
 */
router.get('/noapellido', async (req, res) => {
  try {
    const result = await Author.find( {apellido:null},{nombre:1, _id : 0 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * 3. Consultar los apellidos de los autores que tengan menos de 20
 *  publicaciones o que su país sea Argentina.
 */
router.get('/argentinaor20', async (req, res) => {
  try {
    const result = await Author.find( { $or: [{publicados:{$lt:20}},{pais:"Argentina"}] },{apellido: 1, _id : 0 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//REALIZADO POR : DAVID TORRES Y MATEO ÁLVAREZ

module.exports = router;
