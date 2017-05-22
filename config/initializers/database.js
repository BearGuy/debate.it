var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var cn = {
  host: 'localhost',
  port: 5432,
  database: 'qrem',
  user: 'qrem',
  password: 'password'
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/qrem';
var db = pgp(process.env.DATABASE_URL || cn);

module.exports = db;