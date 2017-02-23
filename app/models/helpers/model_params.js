function eventParams(params) {
  const m_params = [
    title,
    description,
    item_url,
    image_url,
    category,
    venue_id,
    organization_id,
    starttime,
    endtime,
    created_by
  ]
  return m_params
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