const db = require('../../config/initializers/database');
const dynaq = require('../models/helpers/dynaq');
const secret = require('./secret');

var jwt = require('jsonwebtoken');

const Auth = {
  authSuperUser(req, res, next){
    var user;
    console.log(req.params);
    if(req.body.username) {
      userData = req.body.username;
    } else if (req.body.email) {
      userData = req.body.email;
    } else {
      res.json({
        success: false,
        message: 'Error, no username or email were given to authenticate'
      });
    }

    db.one('select * from users where username = $1 or email = $1', userData)
      .then( (user) => {
        if(user.password != req.body.password){
          res.json({
            success: false,
            message: 'Authentication failed. Either username or password were incorrect'
          })
        } else {
          var token = jwt.sign(user, secret);

          res.json({
            success: true,
            message: 'Token granted',
            token: token
          });
        }
      })
      .catch( (err) =>{
         res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      });

  }
}

module.exports = Auth;