const express = require("express");
const Author = require("../models/author");

const router = express.Router();

/**
 * GET authors listing.
 */
router.get("/", async (req, res) => {
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
 * GET authors listing by "nombre" and "apellido"
 * WHEN "publicaciones" < OR = 20 AND "pais" = "Colombia".
 */
router.get("/query1", async (req, res) => {
  try {
    const authors = await Author.find(
      {
        $and: [{ publicados: { $lte: 20 } }, { pais: "Colombia" }],
      },
      {
        nombre: 1,
        _id: 0,
      }
    );
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET authors listing by "nombre"
 * WHEN EXIST "apellido".
 */
router.get("/query2", async (req, res) => {
  try {
    const authors = await Author.find(
      { apellido: { $exists: true } },
      {
        nombre: 1,
        _id: 0,
      }
    );
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET authors listing by "apellido"
 * WHEN "publicaciones" > 20 OR "pais" = "Argentina".
 */
router.get("/query3", async (req, res) => {
  try {
    let filters = {
      $and: [
        { apellido: { $exists: true } },
        {
          $or: [{ publicados: { $gt: 20 } }, { pais: "Argentina" }],
        },
      ],
    };
    const authors = await Author.find(filters, { apellido: 1, _id: 0 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new Author
 */
router.post("/", async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
