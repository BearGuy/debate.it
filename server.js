var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Bear       = require('./app/models/bear')

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080 //set out port

var mongoose = require('mongoose');
mongoose.connect('mongodb://superAdmin:4s5u5j@localhost/debater',{auth:{authdb:"admin"}});
mongoose.set('debug', true);

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

    });




app.use('/api', router);

app.listen(port);
console.log('The Magic is happening on port ' + port)

