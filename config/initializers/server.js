//To be used
var express       = require('express');
var app           = express();
var path          = require('path');
//var config        = require('nconf');

var expressJWT    = require('express-jwt');

var jwt           = require('jsonwebtoken');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var bodyParser    = require('body-parser');

var apiRoutes     = require('../../app/routes/index')

const secret      = require('../../app/auth/secret');

var start = function(cb) {

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  app.use(expressJWT({ secret: secret }).unless({
    path: ['/',
      { url: '/api/events', methods: ['GET'] },
      { url: '/api/auth', methods: ['POST'] },
      { url: '/api/users', methods: ['POST'] }
    ]
  }));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/html/home.html'));
  });

  app.use('/api', apiRoutes);

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
  // will print stacktrace

  var port = 8080 //config.get('NODE_PORT')
  app.listen(process.env.PORT || port);
  console.log('The Magic is happening on port ' + port + ' or 5000 on heroku')

  if (cb){
    return cb
  }

};

module.exports = start;

