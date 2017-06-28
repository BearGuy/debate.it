const db = require('../../config/initializers/database');
const dynaq = require('./helpers/dynaq');
const mp = require('./helpers/model_params');
const categories = require('./categories');

const Events = {
  getAllEvents(req, res, next) {
    const query = dynaq.selectAll('events', req).toString();
    console.log(query);
    db.any(query)
    .then((data) => {
      // let eventList = data.map(event => mp.eventParams(event))
      // console.log(eventList);
      Promise.all(data.map(event => mp.eventParams(event)))
        .then((events) => {
          res.status(200)
          .json({
            status: 'Success',
            data: events,
            message: 'Retrieved ALL events'
          });
      })
    })
    .catch( (err) => {
      return next(err);
    });
  },

  getSingleEvent(req, res, next) {
    var eventID = parseInt(req.params.id);
    db.one('select * from events where id = $1', eventID)
      .then( (data) => {
        mp.eventParams(data)
          .then((event_param_data) =>{
            res.status(200)
            .json({
              status: 'success',
              data: event_param_data,
              message: 'Retrieved ONE event'
            });
          })
          .catch((err) =>{
            return next(err);
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  createEvent(req, res, next) {
    console.log(req.body);
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
        return err;
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