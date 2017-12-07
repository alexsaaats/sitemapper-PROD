'use strict';

const fs = require('fs');
const path = require('path');
const basename  = path.basename(__filename);
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bugnwgx4c29bnjuf', 'ztf5quazay6c10ph', 'c5o0e7d4swrxy8y5', {
  host: 'k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let  model = sequelize['import'](path.join(__dirname, file));

        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;