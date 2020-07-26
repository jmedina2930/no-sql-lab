# Repository to database laboratory - Universidad de Antioquia

Expressjs app connected to a NoSQL database (Mongo DB)

You need to change the db.url and db.db_name attributes in `config/mongoose.js to fit to your database config:
```
const db = {
  url: 'mongodb://localhost:27017/',
  db_name: 'authors',
};
```

SOLUCIÓN:

<h2><strong>REALIZADA POR JHON VASQUEZ Y FELIPE SANTA</strong></h2>

Consideraciones con el esquema:
Se cambió el tipo de dato de "publicados" a Number.
Se agregó el atributo "Apellido" al Esquema.

Esquema resultante:

```
const AuthorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: false,
  },
  publicados: {
    type: Number,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
});
```

<h3><strong>Punto 2</strong></h3>

Se envió por Postman la siguiente información (De a uno)

```
{"nombre": "Gabriel" , "apellido": "Garcia", "publicados": 26, "pais": "Colombia"}

{"nombre": "Álvaro" , "apellido": "Mutis", "publicados": 18, "pais": "Colombia"}

{"nombre": "León de Greiff", "publicados": 15, "pais": "Colombia"}

{"nombre": "Jorge Luis" , "apellido": "Borges", "publicados": 20, "pais": "Argentina"}
```

<h3><strong>Punto 3</strong></h3>

Teniendo en cuenta que Mongoose nos agrega un atributo más en la proyección
llamado"Id", decidimos hacer un mapeo para mostrar solo los campos que pedía 
el ejercicio.


 
Consultar los nombres y los apellidos de los autores que 
tengan publicaciones superiores o iguales a 20 y su país sea Colombia.


```
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
```

/Consultar los nombres de los autores que no tengan apellido en la base de datos.

```
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
```

Consultar los apellidos de los autores que tengan menos de 20 publicaciones o que su país sea Argentina. 

```
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
```

To run the application, first at all, you need to install node libraries with ```npm install```, then you can run it with ```npm start``` or with ```npm run debug``` to follow changes in the code and recharge automatically.

Finally to test you can use a browser and go to ```localhost:3000/authors```. This endpoint will bring all the authors. You can create new authors with the HTTP verbe POST (I recommend you to use Postman to do that).Finally, you can also apply a filter by `pais`, for instance: ```?pais=Argentina```.  
