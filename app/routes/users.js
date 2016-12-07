var User = require('../../app/models/user')

module.exports = function(router) {

  router.route('/')

    //create a user**
    .post(function(req, res) {

        var user = new User(); // create a new instance of a user model.
        user.name = req.body.name; //sets name.
        user.email = req.body.email; //submit email.
        user.username = req.body.username; //set username.
        user.password = req.body.password; //set password.


      //save user & check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created.'});
        });

    })

    .get(function(req, res) {
        User.find(function(err, user) {
            if(err)
                res.send(err);

        res.json(user);
      });
    });

router.route('/:user_id')

        //get the username with user_id.
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    })

    .put(function(req, res) {

    //use user model to find wanted user.
      User.findById(req.params.user_id, function(err, user) {
          if (err)
            res.send(err);

        user.name = req.body.name; // update user info.

        //save the user.

        user.save(function(err) {
          if (err)
            res.send(err);

            res.json({ message: 'User updated.' });
        });

      });
    })

    //delete-a-user.

    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({message: 'User has been vaporized.'});
        });
    });

};