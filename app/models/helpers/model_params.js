const dynaq = require('./dynaq');

function eventParams(params) {
  const event_params = {
    title: params.title,
    description: params.description || null,
    item_url: params.item_url || null,
    image_url: params.image_url || null,
    category: params.category || null,
    venue_id: params.venue_id || null,
    organization_id: params.organization_id || null,
    starttime: params.starttime || null,
    endtime: params.endtime || null,
    created_by: parseInt(params.created_by) || null
  }
  return event_params
}

function userParams(params) {
  return params
}

function venueParams(params) {
  params.lat = parseFloat(params.lat) || null;
  params.long = parseFloat(params.long) || null;

  return params
}

function organizationParams(params) {
  return params
}

module.exports = { eventParams, userParams, venueParams, organizationParams}