const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetEschema = new Schema({
  usuario: String,
  descripcion: String,
  fecha: { type: Date, Default: Date.now },
  comentario: [{
    usuario: String,
    descripcion: String,
    fecha: { type: Date, Default: Date.now },
  }],
}, { collection: 'tweet' });


module.exports.model = mongoose.model('Teewt', TweetEschema);
module.exports.schemaTwwet = TweetEschema;
