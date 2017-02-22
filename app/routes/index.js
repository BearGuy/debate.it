var changeCase = require('change-case');
var express = require('express');
var router = express.Router();

var user = require('../models/user');

router.get('/api/users/', user.getAllUsers);
router.get('/api/users/:id', user.getSingleUser);
router.post('/api/users/', user.createUser);
router.put('/api/users/:id', user.updateUser);
router.delete('/api/users/:id', user.removeUser);

module.exports = router;