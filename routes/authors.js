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

/*   
Consultar los nombres y los apellidos de los autores que 
tengan publicaciones superiores o iguales a 20 y su país sea Colombia.

*/

router.get("/primeraConsulta", async (req, res) => {
  try {
      let authors = await Author.find(
          { $and: [{ publicados: { $gte: 20 } }, { pais: "Colombia" }] },
          { nombre: 1, apellido: 1, _id: 0 }
      );

      authors = authors.map(a=> ({nombre:a.nombre,apellido:a.apellido}) );

      console.log(authors);
      res.json(authors);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

/* Consultar los nombres de los autores que no tengan apellido en la base de datos.*/

router.get("/SegundaConsulta", async (req, res) => {
  try {
      let authors = await Author.find(
          {
              $or: [{ apellido: null }, { apellido: "" }],
          },
          { nombre: 1, _id: 0 }
      );
     authors = authors.map(a=> ({nombre:a.nombre}) );
      res.json(authors);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

/* Consultar los apellidos de los autores que tengan menos de 20 publicaciones o que su país sea Argentina. */

router.get("/TerceraConsulta", async (req, res) => {
  try {
      let authors = await Author.find(
          { $or: [{ publicados: { $lt: 20 } }, { pais: "Argentina" }] },
          { apellido: 1, _id: 0 }
      );
      authors = authors.map(a=> ({apellido:a.apellido}) );
      res.json(authors);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
