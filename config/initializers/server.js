//To be used
var express    = require('express');
var app        = express();
var path = require('path');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var bodyParser = require('body-parser');
var Bear       = require('../../app/models/bear')

var start = function(cb) {

    console.log('We make it this far?')

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());

    var router = express.Router()

    router.use(function(req, res, next) {
      //logging
      console.log('Something is happening. Pretty freaky yo!')
      next();
    });

    router.get('/', function (req, res){
      res.json({ message: 'hooray! welcome to our api fam!' });
    });

    router.route('/bears')

        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(function(req, res) {

            var bear = new Bear();      // create a new instance of the Bear model
            bear.name = req.body.name;  // set the bears name (comes from the request)

            // save the bear and check for errors
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear created!' });
            });

        })

        .get(function(req, res) {
            Bear.find(function(err, bears) {
                if (err)
                    res.send(err);

                res.json(bears);
            });
        });

    router.route('/bears/:bear_id')

        //get the bear with bear_id
        .get(function(req, res) {
            Bear.findById(req.params.bear_id, function(err, bear) {
                if (err)
                    res.send(err)
                res.json(bear);
            });
        })

        .put(function(req, res) {

            // use our bear model to find the bear we want
            Bear.findById(req.params.bear_id, function(err, bear) {

                if (err)
                    res.send(err);

                bear.name = req.body.name;  // update the bears info

                // save the bear
                bear.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Bear updated!' });
                });

            });
        })

        .delete(function(req, res) {
            Bear.remove({
                _id: req.params.bear_id
            }, function(err, bear) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted, poor bear :(' });
            });
        });


    app.use('/api', router);

    app.listen(8080);
    console.log('The Magic is happening on port ' + '8080')

    if (cb){
        return cb
    }

};

module.exports = start;

