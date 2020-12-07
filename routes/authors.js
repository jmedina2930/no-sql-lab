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

router.get('/Consulta1_menor_20', async (req, res) => {
  try {
    let filters = {};
    console.log(req.query);
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({$and:[{ publicados: { $lte: 20 }}, {pais: 'Colombia'}]}, { nombre: 1, apellido: 2 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/Consulta2_apellido', async (req, res) => {
  try {
    let filters = {};
    console.log(req.query);
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({ apellido: { $exists: true } }, { nombre: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/Consulta3_Arg_mayor20_Pub', async (req, res) => {
  try {
    let filters = {};
    console.log(req.query);
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({$or:[{ publicados: { $gt: 20 }}, {pais: 'Argentina' }]}, { nombre: 1, apellido: 2 });
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
