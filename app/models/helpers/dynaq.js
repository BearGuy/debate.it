const _ = require('lodash');
const db = require('../../../config/initializers/database');
const model_params = require('./model_params');
const squel = require('squel');

const dynaq = {
  select(table, req, next) {
    query_string = `select * from ${table} where id = $1`;
    try {
      db.one(query_string, req.id)
        .then( (data) => {
          return data
        })
        .catch( (err) => {
          return next(err);
        });
    }
    catch(err) {
      return next(err);
    }
  },

  selectAll(table, req, next) {
    try {
      console.log(req.query);
      if (!_.isEmpty(req.query)) {
      // join is necessary for
      // they can query for
      // venue
      // organization
      // capacity
      // interested
      // attending
      // startTime
      // endTime
      // user

      // special cases are
      // category
      // venue
      // org
      // user
      let query_string;
      attribute = req.query;
      attribute_type = Object.keys(req.query).toString();
      //let params = req.query.forEach( (param) => {
        if ( Object.keys(req.query).toString() == 'category') {
          var category_string = squel.select()
                                  .field('event')
                                  .from("event_categories")
                                  .where("category = ?", squel.select()
                                                              .field('id')
                                                              .from("categories")
                                                              .where("type = ?", attribute[attribute_type]));

          console.log(category_string.toString())
          //return category_string.toString()
        } else {
        }
     // })
      //query_string = `select * from ${table} where `
      //console.log(params);
      return query_string = squel.select().from('events').where("id = ?", category_string)
      } else {
    return squel.select().from('events')
  }
    }
    catch(err){
      return err;
    }
  },

  update(table, req, next) {
    try {
      var query = [];
      var keys = _.keys(req.body);
      var params = _.flatten([ _.toArray(req.body), new Date(), parseInt(req.params.id)]);

      _.each(keys, (key, i) => {
        query.push(key + '=$' + (i + 1));
      })

      query_string = query.join(", ")
      var last_number = parseInt(query_string.slice(-1));
      query_string = `update ${table} set `
                      .concat(query_string)
                      .concat(`, updated_at=$${last_number + 1} where id=$${last_number + 2}`);

      return { query: query_string, params: params };
    }
    catch(err) {
      return next(err);
    }
  },

  create(table, req, next) {
    var $keys = [];
    try {
      switch(table) {
        case('events'):
          var params = model_params.eventParams(req.body);
          let params_array = _.toArray(_.keys(params))
          var key_string = params_array.join(", ");

          _.each(params_array, (key, i) => {
            $keys.push('${' + key + '}');
          })

          var $key_string = $keys.join(", ");
          break;
        default:
          break;
      }
      query_string = `insert into ${table}(${key_string})values(${$key_string})`;

      return { query_string, params }
    }
    catch(err) {
      return next(err);
    }
  },
}

module.exports = dynaq;
