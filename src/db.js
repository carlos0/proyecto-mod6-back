/* eslint no-console: 0 */
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('./configig/configig');

let db = null;

const dbInitMongo = () => {
  if (!db) {
    if (config.mongo.user === '' || config.mongo.user === null || config.mongo.user === undefined) {
      mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`);
    } else {
      mongoose.connect(`mongodb://${config.mongo.user}:${config.mongo.pass}@${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`);
    }
    db = {
      models: {},
      mongoose,
    };
    const dir = path.join(__dirname, 'schemas');
    fs.readdirSync(dir).forEach((file) => {
      const schema = require(path.join(dir, file)); // eslint-disable-line import/no-dynamic-require
      db.models[schema.model.modelName] = schema.model;
    });
  }
  return db;
};

module.exports = {
  dbInitMongo,
};
