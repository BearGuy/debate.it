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
      // PASS ARGUMENT TO SORT BY POPULARITY, PROXIMITY, AND TIME

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
      let attribute = req.query;
      let attribute_type = Object.keys(req.query)
      let attribute_hash={};
      attribute_type.forEach( (tag) => {
        //if ( Object.keys(tag).toString() == 'category') {
        switch(tag) {
          case('category'):
            attribute_hash[tag]=(squel.select()
                                  .field('event')
                                  .from("event_categories")
                                  .where("category = ?", squel.select()
                                                              .field('id')
                                                              .from("categories")
                                                              .where("type = ?", attribute[tag])));
            break;
          case('venue'):
            attribute_hash[tag]=(squel.select()
                                  .field('id')
                                  .from('venues')
                                  .where("title = ?", attribute[tag]));
            break;
          case('organization'):
            attribute_hash[tag]=(squel.select()
                                  .field('id')
                                  .from('organizations')
                                  .where("title = ?", attribute[tag]));
            break;
          case('sort'):
          //order by squel
            break;
          default:
            break;
        }
      });
      console.log(Object.prototype.toString.call(attribute_hash));
      //console.log(attribute_hash.pop().toString());
      query_string = squel.select().from('events')

      if (attribute_hash['category'] !== undefined) {
        query_string = query_string.where("id = ?", attribute_hash['category']);
      }
      if (attribute_hash['venue']!== undefined){
        query_string = query_string.where("id = ?", attribute_hash['venue']);
      }
      if (attribute_hash['organization'] !== undefined){
        query_string = query_string.where("id = ?", attribute_hash['organization']);
      }


      console.log(query_string.toString());
      return query_string
      } else {
    return squel.select().from(table);
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
    var params_values;
    var setCreateFields = {};
    try {
      switch(table) {
        case('events'):
          // var params = model_params.eventCreateParams(req.body);
          // let params_array = _.toArray(_.keys(params))
          let params_array = _.toArray(_.keys(req.body))
          params_values = _.toArray(_.values(req.body))
          // var key_string = params_array.join(", ");

          // console.log(params_array);

          // _.each(params_array, (key, i) => {
          //   $keys.push('${' + key + '}');
          // })

          _.each(params_array, (key, i) => {
            console.log(key)
            var num = i + 1;
            setCreateFields[key] = (`$ + ${num}`)
          })

          // var $key_string = $keys.join(", ");
          break;
        case('organizations'):
          break;

        default:
          break;
      }
      //query_string = `insert into ${table}(${key_string})values(${$key_string})`;
      query_string = squel.insert()
                          .into(table)
                          .setFields(req.body)
                          .toString()

      console.log(query_string)

      params = [] // params_values

      return { query_string, params }
    }
    catch(err) {
      return err;
    }
  },
}

module.exports = dynaq;
