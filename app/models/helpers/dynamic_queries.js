const _ = require('lodash');
const m_params = require('./model_params');

function update(table, req, next) {
  try {
    var query = [];
    var keys = _.keys(req.body);
    var params = _.flatten([ _.toArray(req.body), new Date(), parseInt(req.params.id)]);
    _.each(keys, (p, i) => {
      query.push(p + '=$' + (i + 1));
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
  eventParams = m_params.eventParams().join(", ")

  try{
    query_string = `insert into ${table}(${eventParams})`

    return query_string
  }
  catch(err) {
    return next(err);
  }
}

module.exports = { create, update }