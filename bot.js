var config = require('./config/config.js');
var irc = require('irc');

var bot = new irc.Client(config.server, config.username, {
  channels: config.channels,
  port: config.port,
  userName: config.username,
  password: config.oauth
});