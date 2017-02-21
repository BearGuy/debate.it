var changeCase = require('change-case');
var express = require('express');
var router = express.Router();
var routes = require('require-dir')();

var db = require('../../queries');

router.get('/api/puppies/', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies/', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);

module.exports = router;

// module.exports = function(app) {
//   'use strict';

//   // Initialize all routes
//   Object.keys(routes).forEach(function(routeName) {
//     var router = express.Router();
//     // You can add some middleware here
//     // router.use(someMiddleware);
//     router.use(function(req, res, next) {
//       //logging
//       console.log('The API is being accessed!')
//       next();
//     });

//     // Initialize the route to add its functionality to router
//     require('./' + routeName)(router);

//     // Add router to the speficied route name in the app
//     app.use('/api/' + changeCase.paramCase(routeName), router);
//   });
// };