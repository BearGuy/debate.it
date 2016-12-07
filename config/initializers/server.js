//To be used
var express    = require('express');
var app        = express();
var path = require('path');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var bodyParser = require('body-parser');
var Bear       = require('../../app/models/bear')
var User      = require ('../../app/models/user')

var start = function(cb) {

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  require('../../app/routes/index')(app);

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });

  app.listen(8080);
  console.log('The Magic is happening on port 8080')

  if (cb){
    return cb
  }

};

module.exports = start;

