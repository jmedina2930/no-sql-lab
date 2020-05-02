const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET users listing.
 */
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({ pais: 'Argentina' });
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
