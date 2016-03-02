var config = require('./config/config.js');
var irc = require('irc');

var bot = new irc.Client(config.server, config.username, {
  channels: config.channels,
  port: config.port,
  userName: config.username,
  password: config.oauth
});


bot.addListener('message', function (from, to, message) {
    console.log(from + ' => to ' + message);
    if (from == "freakinjolly") {
        bot.say(to, "STFU DIKO");
    } else {
        bot.say(to, "You da best");
    }
});