const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  publicados: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  apellido:{
    type: String,
    required: false,
  }
  
});

AuthorSchema.set('toObject', {
  virtuals: true,
});
AuthorSchema.set('toJSON', {
  virtuals: true,
});


const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
