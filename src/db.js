/* eslint no-console: 0 */
/* eslint-disable-line import/no-dynamic-require */

const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');
const config = require('./config/config');

let db = null;

module.exports = () => {
  if (!db) {
    mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`);
    db = {
      models: {},
      mongoose,
    };
    const dir = path.join(__dirname, 'schemas');
    fs.readdirSync(dir).forEach((file) => {
      const schema = require(path.join(dir, file));
      db.models[schema.model.modelName] = schema.model;
    });
  }
  return db;
};
