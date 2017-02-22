const db = require('../../config/initializers/database');

const Venue = {
  getAllVenue(req, res, next) {
    db.any('select * from venues')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch( function(err) {
      return next(err);
    });
  },

  getSingleVenue(req, res, next) {
    var userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', userID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE puppy'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  },

  createVenue(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into users(email, username, password)' +
        'values(${email}, ${username}, ${password})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  },

  updateVenue(req, res, next) {
    db.none('update users set email=$1, username=$2, password=$3 where id=$5',
      [req.body.email, req.body.email, req.body.password, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  },

  removeVenue(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('delete from pups where id = $1', userID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} puppy`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  },
}

module.exports = Venue;
