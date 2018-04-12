/* eslint no-console: 0 */
import _ from 'underscore';
import configFunction from '../src/config/config.development';
import db from '../src/db';

const base = db({
  src: {
    config: {
      config: configFunction,
    },
  },
});

function creaNotarios() {
  const Persona = base.models.persona;
  const Notario = base.models.notario;
  const Notaria = base.models.notaria;
  const Gestion = base.models.gestion;
  const creaPers = [];
  const n = process.argv[2];
  let idsNotarios;
  let idsNotarias;
  let cont = 31;
  for (let i = 1; i <= n; i += 1) {
    const personas = {
      documento_identidad: `00000${cont}`,
      complemento_documento: '00',
      fecha_nacimiento: '1980-01-01',
      nombres: `NOTARIO${cont}`,
      primer_apellido: 'NOTARIO',
      segundo_apellido: 'NOTARIO',
      sexo: 'F',
      _usuario_creacion: 1,
      _fecha_creacion: '2017-04-25 18:53:14',
      fid_tipo_documento: 100,
    };
    creaPers.push(personas);
    cont += 1;
  }
  Persona.bulkCreate(creaPers).then(() => {
    return Persona.findAndCountAll({ limit: n, order: [['id_persona', 'DESC']] });
  }).then((resPersona) => {
    const idsP = _.map(resPersona.rows, (personas) => {
      return personas.id_persona;
    });
    const idsPersonas = _.chain(idsP).reverse().value();
    const creaNotario = [];
    for (let i = 1; i <= n; i += 1) {
      const notarios = {
        fecha_revocacion: '2017-12-31',
        clave: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzn8TJlT/c/7tIs6uVNDW6FRLfzngrTTJcR9vcy5uvFHJ71V4WhUjflwrkbvAvHHr0TpeLfDz7dBPKxSJwD3NdR3p4HOYgJ9SH7soF4QID1PiUvsN+ERdCJdVrztwm4GOGnWelREbGKUiWyUa1eKGb3CamEvETXgXZOxtp+yDEf+J8BNQrAj++96lrb5MBhF5WZ7xvKLhtB3QgD6x2VqX043zRHleAp2AttctWeuQXksuBv4qTOjvTK9LvWzmvPS5F9mcIm2XRY86ea0/4nPfY4GbJooc86i480bb8tQLB4eDpfgvhq3jsOz359lbfUkGjSTI+5rTFQl0YBLqZSK45wIDAQAB',
        serie_certificado: '123456',
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_persona: idsPersonas[i - 1],
      };
      creaNotario.push(notarios);
    }
    return Notario.bulkCreate(creaNotario);
  }).then(() => {
    return Notario.findAndCountAll({ limit: n, order: [['id_notario', 'DESC']] });
  })
  .then((resNotarios) => {
    const idsNos = _.map(resNotarios.rows, (notarios) => {
      return notarios.id_notario;
    });
    idsNotarios = _.chain(idsNos).reverse().value();
    const creaNotaria = [];
    for (let i = 1; i <= n; i += 1) {
      const notarias = {
        numero: 1,
        direccion: '',
        estado: 'ACTIVO',
        n: process.argv[3],
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_dpa: 1,
        fid_clase: 401,
      };
      creaNotaria.push(notarias);
    }
    return Notaria.bulkCreate(creaNotaria);
  })
  .then(() => {
    return Notaria.findAndCountAll({ limit: n, order: [['id_notaria', 'DESC']] });
  })
  .then((resNotarias) => {
    const idsNas = _.map(resNotarias.rows, (notarias) => {
      return notarias.id_notaria;
    });
    idsNotarias = _.chain(idsNas).reverse().value();
    const creaGestion = [];
    for (let i = 1; i <= n; i += 1) {
      const gestion = {
        fecha_inicio: '2017-01-01',
        fecha_fin: '2017-12-31',
        _usuario_creacion: '1',
        estado: 'ACTIVO',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_notario: idsNotarios[i - 1],
        fid_notaria: idsNotarias[i - 1],
      };
      creaGestion.push(gestion);
    }
    return Gestion.bulkCreate(creaGestion);
  })
  .then(() => {
    console.log('Se crearon los notarios');
  })
  .catch((err) => {
    console.log(err);
  });
}


creaNotarios();
