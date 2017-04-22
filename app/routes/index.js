var changeCase = require('change-case');
var express = require('express');
var router = express.Router();

const user = require('../models/users');
const venue = require('../models/venues');
const organization = require('../models/organizations');
const event = require('../models/events');

router.get('/users/', user.getAllUsers);
router.get('/users/:id', user.getSingleUser);
router.post('/users/', user.createUser);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.removeUser);

router.get('/venues/', venue.getAllVenues);
router.get('/venues/:id', venue.getSingleVenue);
router.post('/venues/', venue.createVenue);
router.put('/venues/:id', venue.updateVenue);
router.delete('/venues/:id', venue.removeVenue);

router.get('/organizations/', organization.getAllOrganizations);
router.get('/organizations/:id', organization.getSingleOrganization);
router.post('/organizations/', organization.createOrganization);
router.put('/organizations/:id', organization.updateOrganization);
router.delete('/organizations/:id', organization.removeOrganization);

router.get('/events/', event.getAllEvents);
router.get('/events/:id', event.getSingleEvent);
router.post('/events/', event.createEvent);
router.put('/events/:id', event.updateEvent);
router.delete('/events/:id', event.removeEvent);

module.exports = router;