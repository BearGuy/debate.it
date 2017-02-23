const db = require('../../config/initializers/database');

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
    db.none('insert into users(email, username, password)' +
        'values(${email}, ${username}, ${password})',
      req.body)
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
  },

  updateUser(req, res, next) {
    db.none('update users set email=$1, username=$2, password=$3, updated_at=$4 where id=$5',
      [req.body.email, req.body.email, req.body.password, new Date(), parseInt(req.params.id)])
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
