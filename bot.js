var config = require('./config/config.js');
var irc = require('irc');

var bot = new irc.Client(config.server, config.username, {
  channels: config.channels,
  port: config.port,
  userName: config.username,
  password: config.oauth
});
bot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    if (from == "bnage") {
        bot.say('#freakinjolly', "You're the best");
        bot.say('#bnage', "You're the best");
    }
    else if (from == "freakinjolly") {
        //Will type in both chats, you need to condition the channels
        bot.say('#freakinjolly', "STFU DIKO");
        bot.say('#bnage', "STFU DIKO");
    }
});

