'use strict';

module.exports = function(cb) {
    var mongoose = require('mongoose');

    var port = process.env.PORT || 8080 //set out port

    var dbURI = `mongodb://${process.env.MONGODB_LOGIN}/debater`;

    console.log('Where do we die?')
    mongoose.connect(dbURI, {auth: {authdb:"admin"} });
    mongoose.set('debug', true);

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + dbURI);
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

    module.exports = mongoose;

    cb();
};