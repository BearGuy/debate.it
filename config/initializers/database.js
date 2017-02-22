var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/qrem';
var db = pgp(process.env.DATABASE_URL || connectionString);

module.exports = db;