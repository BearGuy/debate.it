const db = require('../../config/initializers/database');
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
    req.body.owner = parseInt(req.body.owner);
    db.none('insert into events(title, description, item_url, image_url, category, venue_id, organization_id, starttime, endtime, created_by)' +
        'values(${title}, ${description}, ${item_url}, ${image_url}, ${category}, ${venue_id}, ${organization_id}, ${starttime}, ${endtime}, ${created_by})',
      req.body)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one organization'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  updateEvent(req, res, next) {
    const { query, params } = dynaq.dynamicUpdate('organizations', req);
    db.none(query, params)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated organization'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  removeEvent(req, res, next) {
    var organizationID = parseInt(req.params.id);
    db.result('delete from organizations where id = $1', organizationID)
      .then( (result) => {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} organization`
          });
        /* jshint ignore:end */
      })
      .catch( (err) => {
        return next(err);
      });
  },
}

module.exports = Events;