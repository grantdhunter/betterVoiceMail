var gcm = require('node-gcm');
var env = process.env.NODE_ENV;
var config = require(__dirname + '/../config/config.json')[env];

var sender = new gcm.sender(config.gcmKey);