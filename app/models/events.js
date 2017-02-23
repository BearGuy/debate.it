const db = require('../../config/initializers/database');
const dynaq = require('./helpers/dynamic_queries');
const categories = require('./categories');

const Events = {
  getAllEvents(req, res, next) {
    db.any('select * from events')
    .then( (data) => {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: 'Retrieved ALL events'
        });
    })
    .catch( (err) => {
      return next(err);
    });
  },

  getSingleEvent(req, res, next) {
    var eventID = parseInt(req.params.id);
    db.one('select * from events where id = $1', eventID)
      .then( (data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE event'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  createEvent(req, res, next) {
    const { query_string, params } = dynaq.create('events', req);
    db.none(query_string, params)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one event'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  updateEvent(req, res, next) {
    const { query, params } = dynaq.update('events', req);
    db.none(query, params)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated event'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  removeEvent(req, res, next) {
    var organizationID = parseInt(req.params.id);
    db.result('delete from events where id = $1', organizationID)
      .then( (result) => {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} event`
          });
        /* jshint ignore:end */
      })
      .catch( (err) => {
        return next(err);
      });
  },
}

module.exports = Events;