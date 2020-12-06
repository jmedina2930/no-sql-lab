const mongoose = require("mongoose");

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

AuthorSchema.set("toObject", {
  virtuals: true,
});
AuthorSchema.set("toJSON", {
  virtuals: true,
});

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
