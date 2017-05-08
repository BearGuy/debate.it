var bcrypt = require('bcryptjs');

exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

exports.comparePassword = function(password, userPassword) {
   bcrypt.compare(password, userPassword)
    .then( (res) => {
      return res;
    })
    .catch( (err) => {
      return err;
    });
};