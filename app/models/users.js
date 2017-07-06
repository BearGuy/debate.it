const db = require('../../config/initializers/database');
const dynaq = require('./helpers/dynaq');
const encrypt = require('../auth/encrypt');

const Users = {
  getAllUsers(req, res, next) {
    db.any('select * from users')
    .then( (data) => {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch( (err) => {
      return next(err);
    });
  },

  getSingleUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', userID)
      .then( (data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE user'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  createUser(req, res, next) {
    encrypt.cryptPassword(req.body.password, (err, encrypted_password) => {
      if (err) {
        return res.json(err);
      } else {
      req.body.password = encrypted_password;
      const { query_string, params } = dynaq.create('users', req);
      console.log(query_string)
      db.none(query_string, params)
        .then( () => {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one user'
            });
        })
        .catch( (err) => {
          return next(err);
        });
      }
    });
  },

  updateUser(req, res, next) {
    const { query, params } = dynaq.update('users', req);
    db.none(query, params)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated user'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  removeUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('delete from users where id = $1', userID)
      .then( (result) => {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} user`
          });
        /* jshint ignore:end */
      })
      .catch( (err) => {
        return next(err);
      });
  },
};

// make this available to our users in our Node applications
module.exports = Users;
