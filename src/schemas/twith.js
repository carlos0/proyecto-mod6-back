const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetEschema = new Schema({
  id: { type: Number, default: 0 },
  usuario: String,
  descripcion: String,
  fecha: { type: Date, Default: Date.now },
  comentario: [{
    usuario: String,
    descripcion: String,
    fecha: { type: Date, Default: Date.now },
  }],
  creacion: {
    usuario: String,
    fecha: { type: Date, default: Date.now },
  },
  modificacion: {
    usuario: String,
    fecha: Date,
  },
}, { collection: 'tweet' });


module.exports.model = mongoose.model('Teewt', TweetEschema);
module.exports.schemaTwwet = TweetEschema;
