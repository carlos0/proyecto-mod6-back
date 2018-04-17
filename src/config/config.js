/* eslint-disable */
const logger = require('../lib/logger');

/* Determinar el entorno de desarrollo del sistema */

let env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}

module.exports = {
  // Datos de la base de las rutas
  api: {
    main: '/api/v1/',
  },
  // Datos para la conexión a Solr
  mongo: {
    host: 'localhost',
    port: 27017,
    database: 'practica',
  },
  puerto: 4000,
};
