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
 * GET authors publicaciones >20 y pais colombia.
 */
router.get('/sup20colombia', async (req, res) => {
  try {
    let filters = {};
    filters = {publicados: {$gt:"20"},pais: "Colombia"},{nombre:1,apellido:1,_id:0};
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * GET authors whitout lastname.
 */
router.get('/sinApellido', async (req, res) => {
  try {
    let filters = {};
    filters = {apellido:" "},{nombre:1, _id:0};
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * GET authors publicados < 20 o pais Argentina
 */
router.get('/inf20Argentina', async (req, res) => {
  try {
    let filters = {};
    filters = { $or: [ { publicados: { $lt: "20" } }, { pais: "Argentina" } ] };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
