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
    res.json(authors  );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Consultar los nombres y los apellidos de los autores que tengan publicaciones superiores o iguales a 20 y su país sea Colombia
 */
router.get('/pubrangefilter', async (req, res) => {
  try {
    let filters = { publicados: { $gte : "20" } , pais: "Colombia" };
    const authors = await Author.find(filters, {nombre: 1, apellido: 1, _id: 0 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Consultar los nombres de los autores que no tengan apellido en la base de datos
 */
router.get('/nolastname', async (req, res) => {
  try {
    let filters = { apellido: "", apellido: null };
    const authors = await Author.find(filters, {nombre: 1, _id: 0 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Consultar los apellidos de los autores que tengan menos de 20 publicaciones o que su país sea Argentina
 */
router.get('/apellidos', async (req, res) => {
  try {
    let filters = { $or: [ { publicados: { $lt: 20 } }, { pais: "Argentina" } ] };
    const authors = await Author.find(filters, {apellido: 1, _id: 0 });
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
