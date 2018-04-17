const usuarioBL = require('../bls/usuarioBL');

module.exports = (app) => {
  app.route('/api/v1/usuarios').post(async (req, res) => {
    try {
      const usuarioRepetido = await app.src.db.models.Usuario.find({ usuario: req.body.usuario });
      if (usuarioRepetido.lenght > 0) {
        throw new Error('El usuario ya existe');
      }
      const Usuario = app.src.db.models.Usuario({ usuario: req.body.usuario });
      await Usuario.save();
      res.json({ mensaje: 'El usuario se guardo correctamente' });
    } catch (err) {
      res.status(400).json({ mensaje: err.message || 'Ha ocurrido un error' });
    }
  });

  app.route('/api/v1/login').post(async (req, res) => {
    const usuario = await app.src.db.models.Usuario.find({ usuario: req.body.usuario });
    if (usuario.lenght === 0) {
      throw new Error('El usuario no existe');
    }
    const seguidores = usuario[0].seguidores;
    const datos = [];
    const use = usuario[0].usuario;
    const teewt1 = await app.src.db.models.Teewt.find({ usuario: use });
    if (teewt1.length > 0) {
      for (let i = 0; i < teewt1.length; i += 1) {
        const user = {
          usuario: use,
          tweet: teewt1[i].descripcion || '',
          comentario: teewt1[i].comentario || '',
        };
        datos.push(user);
      }
    }
    const data = await app.src.db.models.Usuario.find({ usuario: { $in: seguidores } });
    await Promise.all(data.map(
      async (dato) => {
        const tweet = await app.src.db.models.Teewt.find({ usuario: dato.usuario });
        if (tweet.length > 0) {
          for (let i = 0; i < tweet.length; i += 1) {
            const user2 = {
              usuario: dato.usuario,
              tweet: tweet[0].descripcion || '',
              comentario: tweet[0].comentario || '',
            };
            datos.push(user2);
          }
        }
      }));
    res.json(datos);
  });

  app.route('/api/v1/usuarios/seguidores/:usuario').get(async (req, res) => {
    try {
      const usuario = await app.src.db.models.Usuario.find({ usuario: req.params.usuario });
      const seguidor = usuario[0].seguidores;
      seguidor.push(req.query.seguidor);
      await app.src.db.models.Usuario.findOneAndUpdate({ usuario: req.params.usuario }, { seguidores: seguidor });
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (err) {
      res.status(400).json({ mensaje: err.message || 'Ha ocurrido un error.' });
    }
  });

  app.route('/api/v1/timeline').get(async (req, res) => {
    const usuario = await app.src.db.models.Usuario.find({ usuario: req.body.usuario });
    if (usuario.lenght === 0) {
      throw new Error('El usuario no existe');
    }
    const seguidores = usuario[0].seguidores;
    const datos = [];
    const use = usuario[0].usuario;
    const teewt1 = await app.src.db.models.Teewt.find({ usuario: use });
    if (teewt1.length > 0) {
      const user = {
        usuario: use,
        tweet: teewt1[0].descripcion || '',
        comentario: teewt1[0].comentario || '',
      };
      datos.push(user);
    }
    const data = await app.src.db.models.Usuario.find({ usuario: { $in: seguidores } });
    await Promise.all(data.map(
      async (dato) => {
        const tweet = await app.src.db.models.Teewt.find({ usuario: dato.usuario });
        
        if (tweet.length > 0) {
          console.log(tweet[0]);
          const user2 = {
            usuario: dato.usuario,
            tweet: tweet[0].descripcion || '',
            comentario: tweet[0].comentario || '',
          };
          datos.push(user2);
        }
      }));
    res.json(datos);
  });

  app.route('/api/v1/tweet').post(async (req, res) => {
    try {
      const Tweet = app.src.db.models.Teewt({ usuario: req.body.usuario, descripcion: req.body.descripcion });
      await Tweet.save();
      res.json({ mensaje: 'El Tweet se guardo correctamente' });
    } catch (err) {
      res.status(400).json({ mensaje: err.message || 'Ha ocurrido un error' });
    }
  });

  app.route('/api/v1/tweet/comentario').post(async (req, res) => {
    try {
      const Tweet = app.src.db.models.Teewt({ _id: req.body._id, descripcion: req.body.descripcion });
      await Tweet.save();
      res.json({ mensaje: 'El comentario se guardo correctamente' });
    } catch (err) {
      res.status(400).json({ mensaje: err.message || 'Ha ocurrido un error' });
    }
  });
};
