const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioEschema = new Schema({
  usuario: String,
  seguidores: [],
  creacion: {
    usuario: String,
    fecha: { type: Date, default: Date.now },
  },
  modificacion: {
    usuario: String,
    fecha: Date,
  },

}, { collection: 'usuario' });

module.exports.model = mongoose.model('Usuario', UsuarioEschema);
module.exports.schemaUsuario = UsuarioEschema;

