import _ from 'underscore';
import SimpleError from '../lib/simple-error';

const construyeArrayClaves = (datos) => {
  return new Promise((fullfill, reject) => {
    if (!datos.id_notario || !datos.llaves) {
      reject(new SimpleError('Debe ingresar los dos parámetros.', 400));
    }
    const totalDatos = [];
    for (let i = 0; i < datos.llaves.length; i += 1) {
      const data = {};
      data.clave = JSON.parse(datos.llaves[i]);
      data.fid_notario = datos.id_notario;
      data._usuario_creacion = 1;
      totalDatos.push(data);
    }
    fullfill(totalDatos);
  });
};

const modificaN = (clave) => {
  let mod;
  return clave.findAndCountAll({ where: { estado: 'ACTIVO' } }).then((resul) => {
    const idsClave = _.map(resul.rows, (claves) => {
      return claves.id_clave;
    });
    const listapromesas = [];
    const modulo = Math.floor((Math.random() * 20) + 2);
    mod = modulo;
    for (let i = 0; i < idsClave.length; i += 1) {
      if (i % modulo === 0) {
        listapromesas.push(idsClave[i]);
      }
    }
    return clave.update({ estado: 'INACTIVO' }, { where: { id_clave: { in: listapromesas } } });
  }).then(() => {
    return `Todo super! ${mod}`;
  })
  .catch((err) => {
    throw new Error(`algo salio mal: ${err}`);
  });
};

module.exports = {
  construyeArrayClaves,
  modificaN,
};
