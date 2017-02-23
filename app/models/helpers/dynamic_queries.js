const _ = require('lodash');
const db = require('../../../config/initializers/database');
const model_params = require('./model_params');

function select(table, req, next) {
  try {
    db.one('select * from $1 where id = $2', table, req.id)
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
}

function selectAll(table, req, next) {
  try {
    return req;
  }
  catch(err){
    return next(err);
  }
}

function update(table, req, next) {
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
}

function create(table, req, next) {
  var $keys = [];
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
  try{

    query_string = `insert into ${table}(${key_string})values(${$key_string})`;

    return { query_string, params }
  }
  catch(err) {
    return next(err);
  }
}

module.exports = { select, selectAll, create, update }
