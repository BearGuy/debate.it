const db = require('../../config/initializers/database');
const dynaq = require('./helpers/dynamic_queries');

const Venues = {
  getAllVenues(req, res, next) {
    db.any('select * from venues')
    .then( (data) => {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: 'Retrieved ALL venues'
        });
    })
    .catch( (err) => {
      return next(err);
    });
  },

  getSingleVenue(req, res, next) {
    var venueID = parseInt(req.params.id);
    db.one('select * from venues where id = $1', venueID)
      .then( (data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE venue'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  createVenue(req, res, next) {
    req.body.lat = parseFloat(req.body.lat) || null;
    req.body.long = parseFloat(req.body.long) || null;
    db.none('insert into venues(title, address, city, province, country, lat, long)' +
        'values(${title}, ${address}, ${city}, ${province}, ${country}, ${lat}, ${long})',
      req.body)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one venue'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  updateVenue(req, res, next) {
    const { query, params } = dynaq.update('venues', req);
    db.none(query, params)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated venue'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  removeVenue(req, res, next) {
    var venueID = parseInt(req.params.id);
    db.result('delete from venues where id = $1', venueID)
      .then( (result) => {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} venue`
          });
        /* jshint ignore:end */
      })
      .catch( (err) => {
        return next(err);
      });
  },
}

module.exports = Venues;
