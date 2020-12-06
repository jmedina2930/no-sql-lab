const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * use /authors/query?n=1 to perform the the first query.
 * use /authors/query?n=2 to perform the second one.
 * use /authors/query?n=3 to perform the third one.
 * Anything else is a bad request (400).
 */
router.get('/query', async (req, res) => {
  try {
    switch (req.query.n) {
      case '1':
        query1(req, res);
        break;
      case '2':
        query2(req, res);
        break;
      case '3':
        query3(req, res);
        break;
      default:
        res.status(400).json({ message: '._. are you serious? ._.'});
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Consultar los nombres y los apellidos de los autores que tengan 
 * publicaciones inferiores o iguales a 20 y su país sea Colombia.
 */
query1 = async (req, res) => {
  const authors = await Author.find(
    { publicados: { $lte: 20 }, pais: "Colombia" },
    { _id: 0, nombre: 1, apellido: 1 }
  );
  res.json(authors);
};

/**
 * Consultar los nombres de los autores que 
 * tengan apellido en la base de datos.
 */
query2 = async (req, res) => {
  const authors = await Author.find(
    { apellido: { $exists: true, $ne: null } },
    { _id: 0, nombre: 1 }
  );
  res.json(authors)
};

/**
 * Consultar los apellidos de los autores que tengan 
 * más de 20 publicaciones o que su país sea Argentina.
 */
query3 = async (req, res) => {
  const authors = await Author.find(
    { $or: [ { publicados: { $gt: 20 } }, { pais: "Argentina" } ] },
    { _id: 0, apellido: 1 }
  );
  res.json(authors)
};

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

module.exports = router;
