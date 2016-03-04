var config = require('./config/config.js');
var irc = require('irc');
var helper = require('./helper.js');

var commands = {};

var bot = new irc.Client(config.server, config.username, {
  channels: config.channels,
  port: config.port,
  userName: config.username,
  password: config.oauth
});


bot.addListener('message', function (from, to, message) {
    console.log(from + ' => to ' + message);
    
    //COMMANDS
    if(message.charAt(0) === "!") {
        var com = message.split(' ');
        if(message.substring(0,8) === "!command") {
            //Save command
            if(com[1] === "save") {
                var newCommand = helper.newCommand(message);
                //Error handling
                if (newCommand[0] == "!command") {
                    bot.say(to, "Fuck you nice try bitchass");
                }
                if(com[2].charAt(0) != "!") {
                    bot.say(to, "Invalid save, command must start with !");
                } else {
                    commands[newCommand[0]] = newCommand[1];
                    bot.say(to, "Command " + newCommand[0] + " saved!");
                }
            }
        //If its not one of the preset commands then its a custom command
        } else {
            bot.say(to, commands[com[0]]);
        }
    }
    
    if (from == "freakinjolly") {
        bot.say(to, "STFU DIKO");
    } else {
        bot.say(to, "You da best");
    }
});
