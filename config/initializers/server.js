//To be used
var express       = require('express');
var app           = express();
var path          = require('path');
//var config        = require('nconf');

var jwt           = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var bodyParser    = require('body-parser');
// var cookieParser  = require('cookie-parser');

var routes        = require('../../app/routes/index')
// var Bear          = require('../../app/models/bear')
// var User          = require ('../../app/models/user')

var start = function(cb) {

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
  });

  // development error handler
  // will print stacktra

  var port = 8080 //config.get('NODE_PORT')
  app.listen(port);
  console.log('The Magic is happening on port ' + port)

  if (cb){
    return cb
  }

};

module.exports = start;

