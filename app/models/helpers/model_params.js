const db = require('../../../config/initializers/database');
const dynaq = require('./dynaq');
const squel = require('squel');

function eventParams(params) {
  let attribute_hash={};
  attribute_hash['category'] = squel.select()
                                      .field('type')
                                      .from("categories")
                                      .where("id = ?", squel.select()
                                                              .field('category')
                                                              .from("event_categories")
                                                              .where("event = ?", params.id));

  attribute_hash['venue'] = squel.select().from('venues').where("id = ?", params.venue_id);
  attribute_hash['organization'] = squel.select()
                                          .from('organizations')
                                          .where("id = ?", params.organization_id);

  return getEventData(attribute_hash)
    .then((att_data) =>{
      return {
        id: params.id,
        title: params.title,
        description: params.description || null,
        item_url: params.item_url || null,
        fb_event_url: params.fb_event_url || null,
        image_url: params.image_url || null,
        category: att_data['category'] || null,
        venue_id: att_data['venue'] || null,
        organization: att_data['organization'] || null,
        sub_events: params.sub_events || null,
        cost: params.cost || null,
        capacity: params.capacity || null,
        interested: params.interested || null,
        attending: params.attending || null,
        all_day: params.all_day || null,
        recurring: params.recurring || null,
        starttime: params.starttime || null,
        endtime: params.endtime || null,
        created_by: parseInt(params.created_by) || null,
        created_at: params.created_at,
        updated_at: params.updated_at,
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function eventCreateParams(params) {
  // let attribute_hash={};
  // attribute_hash['category'] = squel.insert()
  //                                   .field()

  //                             squel.select()
  //                                     .field('type')
  //                                     .from("categories")
  //                                     .where("id = ?", squel.select()
  //                                                             .field('category')
  //                                                             .from("event_categories")
  //                                                             .where("event = ?", params.id));

  // //attribute_hash['venue'] = squel.select().from('venues').where("id = ?", params.venue_id);
  // attribute_hash['organization'] = squel.select()
  //                                         .from('organizations')
  //                                         .where("id = ?", params.organization_id);
  return {
    title: params.title,
    description: params.description || null,
    item_url: params.item_url || null,
    fb_event_url: params.fb_event_url || null,
    image_url: params.image_url || null,
    category: params.category_id || null,
    venue_id: params.venue_id || null,
    organization: params.organization_id || null,
    sub_events: params.sub_events || null,
    cost: params.cost || null,
    capacity: params.capacity || null,
    interested: params.interested || null,
    attending: params.attending || null,
    all_day: params.all_day || null,
    recurring: params.recurring || null,
    starttime: params.starttime || null,
    endtime: params.endtime || null,
    created_by: parseInt(params.created_by) || null,
    updated_at: parseInt(params.updated_at) || null
  }
}

function userParams(params) {
  return params
}

function venueParams(params) {
  params.lat = parseFloat(params.lat) || null;
  params.long = parseFloat(params.long) || null;

  return params
}

function organizationParams(organization_string) {
  return getOrganizationData(organization_string)
    .then((org_data) =>{
      return {
        id: params.id || null,
        title: params.title || null,
        owner: org_data.owner || null,
        members: org_data.members || null,
        description: params.description || null,
        website_url: params.website_url || null,
        fb_page_url: params.fb_page_url || null,
        phone: params.phone || null,
        created_at: params.created_at || null,
        updated_at: params.updated_at || null,
      }
    })
    .catch((err) =>{
      console.log(err);
    })
}

function getEventData(attribute_hash){
  cateogory_promise = db.any(attribute_hash['category'].toString());
  venue_promise = db.any(attribute_hash['venue'].toString());
  organization_promise = getOrganizationData(attribute_hash['organization'].toString());

  promise_array = [cateogory_promise, venue_promise, organization_promise];

  return Promise.all(promise_array)
    .then((data) => {
      let responseEventData = {};
      responseEventData['category'] = data[0][0];
      responseEventData['venue'] = data[1][0];
      responseEventData['organization'] = data[2];
      return responseEventData;
    })
    .catch((err) => {
      console.log(err)
    });
}

function getOrganizationData(organization_string) {
  console.log(organization_string);
  return db.one(organization_string)
    .then((res) => {
      let owner_string = squel.select().from('users').where("id = ?", res['owner']);
      let members_string = squel.select().from('users')
                                .where("id IN ?", squel.select().field('member')
                                  .from('organization_members')
                                  .where("organization = ?", res['members']));

      let owner_promise = db.one(owner_string.toString());
      let member_promise = db.any(members_string.toString());

      return Promise.all([owner_promise, member_promise])
        .then((org_data) =>{
          var safe_members = org_data[1].map((member) =>{
            return {
              email: member.email,
              username: member.username,
              created_at: member.created_at,
              updated_at: member.updated_at
            }
          });

          return {
            id: res.id || null,
            title: res.title || null,
            owner: org_data[0] || null,
            members: safe_members || null,
            description: res.description || null,
            website_url: res.website_url || null,
            fb_page_url: res.fb_page_url || null,
            phone: res.phone || null,
            created_at: res.created_at || null,
            updated_at: res.updated_at || null,
          }
        })
        .catch((err) =>{
          console.log(err);
        });
    })
    .catch((err) =>{
      console.log(err);
    });
}

function getVenueData(attribute_hash){

}

function getUserData(user_string) {
  return db.one(user_string.toString())
}

function getCategoryData(category_string){

}

module.exports = { eventParams, eventCreateParams, userParams, venueParams, organizationParams}