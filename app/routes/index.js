var changeCase = require('change-case');
var express = require('express');
var router = express.Router();

var user = require('../models/users');
var venue = require('../models/venues');

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

module.exports = router;