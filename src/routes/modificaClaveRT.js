import _ from 'underscore';

module.exports = (app) => {
  const clave = app.src.db.models.clave;

  app.route('/api/v1/modifica')
  .get((req, res) => {
    return clave.findAndCountAll({ where: { estado: 'ACTIVO' } }).then((resul) => {
      const idsClave = _.map(resul.rows, (claves) => {
        return claves.id_clave;
      });
      const listapromesas = [];
      const modulo = Math.floor((Math.random() * 20) + 2);
      for (let i = 0; i < idsClave.length; i += 1) {
        if (i % modulo === 0) {
          listapromesas.push(idsClave[i]);
        }
      }
      return clave.update({ estado: 'INACTIVO' }, { where: { id_clave: { in: listapromesas } } });
    }).then(() => {
      res.json({ mensaje: 'Se actualizaron las claves correctamente.' });
    })
    .catch((err) => {
      res.status(err.code || 500).json({ mensaje: `algo salio mal: ${err}` });
    });
  });
};
