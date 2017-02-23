var changeCase = require('change-case');
var express = require('express');
var router = express.Router();

const user = require('../models/users');
const venue = require('../models/venues');
const organization = require('../models/organizations');
const event = require('../models/events');

router.get('/api/users/', user.getAllUsers);
router.get('/api/users/:id', user.getSingleUser);
router.post('/api/users/', user.createUser);
router.put('/api/users/:id', user.updateUser);
router.delete('/api/users/:id', user.removeUser);

router.get('/api/venues/', venue.getAllVenues);
router.get('/api/venues/:id', venue.getSingleVenue);
router.post('/api/venues/', venue.createVenue);
router.put('/api/venues/:id', venue.updateVenue);
router.delete('/api/venues/:id', venue.removeVenue);

router.get('/api/organizations/', organization.getAllOrganizations);
router.get('/api/organizations/:id', organization.getSingleOrganization);
router.post('/api/organizations/', organization.createOrganization);
router.put('/api/organizations/:id', organization.updateOrganization);
router.delete('/api/organizations/:id', organization.removeOrganization);

router.get('/api/events/', event.getAllEvents);
router.get('/api/events/:id', event.getSingleEvent);
router.post('/api/events/', event.createEvent);
router.put('/api/events/:id', event.updateEvent);
router.delete('/api/events/:id', event.removeEvent);

module.exports = router;