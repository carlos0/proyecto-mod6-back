/* eslint-disable */
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './logger';

module.exports = (app) => {
  // Constante que almacena la congifuracion.
  const configuracion = app.src.config.config;
  console.log('verificando la configuracion', configuracion.puerto);
  // Establece el puerto
  app.set('port', configuracion.puerto);

  // Establece la llave secreta
  app.set('secretAGETIC', configuracion.jwtSecret);

  // Realiza el uso de morgan para generar logs.
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }));

  app.use(helmet());

  // //Showtests
  app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' &&
      req.query.test === '1';
    next();
  });

  // Realiza el uso y configuracion de cors.
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
    headers: 'Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    // 'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    // 'Expires': '-1',
    // 'Pragma': 'no-cache',
  }));

  // Realiza el uso de 'bodyParser' para la recepcion de Json como body.
  app.use(bodyParser.json({ limit: '50mb' }));


  // //eliminar ids en caso de que lo envien por si quieren hacer sqlinjection
  // app.use((req, res, next) => {
  //     delete req.body.id;
  //     next();
  // });
  // para generar un espacio publico, archivos estaticos
  app.use(express.static('public'));

  // app.use(express.static(__dirname + '/public'));
  // // verifica si hay errores en el formato json
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      res.status(400).json({
        mensaje: 'Problemas en el formato JSON',
      });
    } else {
      res.status(500).send('Error interno!');
      console.error(err.stack);
    }
  });
};
