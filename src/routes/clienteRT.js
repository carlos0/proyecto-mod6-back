import _ from 'underscore';
import SimpleError from '../lib/simple-error';
import Util from '../lib/util';

module.exports = (app) => {
  const notario = app.src.db.models.notario;
  const notaria = app.src.db.models.notaria;
  const gestion = app.src.db.models.gestion;
  const clave = app.src.db.models.clave;
  const sequelize = app.src.db.sequelize;
  // const sequelize = app.src.db.sequelize;

  /**
   * @api {get} /api/v1/notarios Lista de id's de notarios
   * @apiVersion 0.1.0
   * @apiGroup Cliente Offline
   *
   * @apiParamExample Ejemplo de consumo Lista todos los notarios
   * /api/v1/notarios
   *
   * @apiParamExample Ejemplo de consumo Lista notarios con menos de 10 llaves disponibles.
   * /api/v1/notarios?limit=-1
   *
   * @apiSuccess {Number} id_notario Id del notario.
   * @apiSuccess {Number} localidad Localidad de la notaria, representado por el id de la notaria.
   *
   * @apiSuccessExample Ejemplo de respuesta exitosa
   * HTTP/1.1 200 OK
   *[
   *  {
   *    "id_notario": 1,
   *    "localidad": 1
   *  },
   *  {
   *    "id_notario": 1,
   *    "localidad": 1
   *  }
   *]
   *
   * @apiError No Content
   *
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 204 No Content
   * {
   *   "msg": "No se encontraron registros para la solicitud."
   * }
  **/

  app.route('/api/v1/notarios')
  .get((req, res) => {
    if (req.query.limit) {
      let sw = 0;
      sequelize.query("select id_notario, coalesce(c.cont, 0) as cont from notario as n left join (select fid_notario, count(*) as cont from clave where estado = 'ACTIVO' group by fid_notario ) as c on n.id_notario = c.fid_notario where c.cont < 11 or c.cont isnull", { type: sequelize.QueryTypes.SELECT })
      .then((resul) => {
        if (resul.length === 0) {
          sw = 1;
          return;
        }
        const idsNotarios = _.map(resul, (notarios) => {
          return notarios.id_notario;
        });
        return gestion.findAll({ where: { fid_notario: { in: idsNotarios } } });
      }).then((gestionResul) => {
        if (sw === 1) {
          const datos = [];
          return res.json(datos);
        }
        const datos = [];
        for (let i = 0; i < gestionResul.length; i += 1) {
          const ids = {};
          ids.id_notario = gestionResul[i].fid_notario;
          ids.localidad = gestionResul[i].fid_notaria;
          datos.push(ids);
        }
        res.json(datos);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    } else {
      gestion.findAll()
      .then((notarioResul) => {
        const datos = [];
        for (let i = 0; i < notarioResul.length; i += 1) {
          const ids = {};
          ids.id_notario = notarioResul[i].fid_notario;
          ids.localidad = notarioResul[i].fid_notaria;
          datos.push(ids);
        }
        res.json(datos);
      })
      .catch((err) => {
        res.status(err.code || 400).json(err.message || { mensaje: `Ocurrio un error: ${err}` });
      });
    }
  });

  /**
   * @api {get} /api/v1/notarios/:id Lista de llaves publicas
   * @apiVersion 0.1.0
   * @apiGroup Cliente Offline
   *
   * @apiParamExample Ejemplo de consumo
   * /api/v1/notarios/1
   *
   * @apiSuccess {String} llave_publica Llave pública del notario.
   * @apiSuccess {Number} n Número de peticiones al día de una notaría.
   *
   * @apiSuccessExample Ejemplo de respuesta exitosa
   * HTTP/1.1 200 OK
   *{
   *  "llave_publica": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzn8TJlT/c/7tIs6uVNDW6FRLfzngrTTJcR9vcy5uvFHJ71V4WhUjflwrkbvAvHHr0TpeLfDz7dBPKxSJwD3NdR3p4HOYgJ9SH7soF4QID1PiUvsN+ERdCJdVrztwm4GOGnWelREbGKUiWyUa1eKGb3CamEvETXgXZOxtp+yDEf+J8BNQrAj++96lrb5MBhF5WZ7xvKLhtB3QgD6x2VqX043zRHleAp2AttctWeuQXksuBv4qTOjvTK9LvWzmvPS5F9mcIm2XRY86ea0/4nPfY4GbJooc86i480bb8tQLB4eDpfgvhq3jsOz359lbfUkGjSTI+5rTFQl0YBLqZSK45wIDAQAB",
   *  "n": 1
   *}
   *
   * @apiError No Content
   *
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 204 No Content
   * {
   *   "msg": "No se encontraron registros para la solicitud."
   * }
  **/

  app.route('/api/v1/notarios/:id')
  .get((req, res) => {
    const datos = {};
    notario.findById(req.params.id)
    .then((notarioResul) => {
      if (_.isNull(notarioResul)) {
        throw new SimpleError('No existe registros para el id introducido.', 400);
      }
      datos.llave_publica = notarioResul.clave;
      return gestion.findById(notarioResul.id_notario);
    }).then((gestionResul) => {
      return notaria.findById(gestionResul.fid_notaria);
    }).then((notariaResul) => {
      datos.n = notariaResul.n;
      res.json(datos);
    })
    .catch((err) => {
      res.status(err.code || 500).json({ mensaje: err.message });
    });
  });

  /**
   * @api {post} /api/v1/claves Guarda claves generadas
   * @apiVersion 0.1.0
   * @apiGroup Cliente Offline
   *
   * @apiParam {Number} id_notario Id del notario que guardara las llaves.
   * @apiParam {String} llaves Llaves generadas.
   *
   * @apiParamExample Ejemplo de consumo
   * /api/v1/claves
   *
   * @apiSuccessExample Ejemplo de respuesta exitosa
   * HTTP/1.1 200 OK
   *{
   *  "mensaje": "los registros se guardaron correctamente"
   *}
   *
   * @apiError No Content
   *
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 204 No Content
   * {
   *   "msg": "No se encontraron registros para la solicitud."
   * }
  **/

  app.route('/api/v1/claves')
  .post((req, res) => {
    Util.construyeArrayClaves(req.body).then((resul) => {
      return clave.bulkCreate(resul);
    }).then(() => {
      res.json({ mensaje: 'los registros se guardaron correctamente' });
    })
    .catch((err) => {
      res.status(400).json({ mensaje: err.message || err });
    });
  });
};
