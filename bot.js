var config = require('./config/config.js');
var irc = require('irc');
var helper = require('./helper.js');
var fs = require('fs');

//Setup returns a hash with the tools necessary to run the bot.
helper.setUp(function (data) {
    console.log(JSON.stringify(data));
    var commands = data;
    
    var bot = new irc.Client(config.server, config.username, {
        channels: config.channels,
        port: config.port,
        userName: config.username,
        password: config.oauth
    });

    bot.addListener('message', function (from, to, message) {
        console.log(from + ' => to ' + message);
        //COMMANDS
        if (message.charAt(0) === '!') {
            var com = message.split(' ');
            if (message.substring(0, 8) === '!command') {
                if (com[1] === 'save') {
                    var newCommand = helper.newCommand(message);
                    if (newCommand[0] == '!command') {
                        bot.say(to, 'Fuck you nice try bitchass');
                    }
                    if (com[2].charAt(0) != '!') {
                        bot.say(to, 'Invalid save, command must start with !');
                    } else {
                        //TODO
                        //Error check, if command exists already then overwrite
                        commands[newCommand[0]] = newCommand[1];
                        var text = newCommand[0] + ':' + newCommand[1] + ';';
                        fs.appendFile('./data/custom_commands.txt', text, function (err) {
                            if (err) throw err;
                            bot.say(to, 'Command ' + newCommand[0] + ' saved!');
                        });
                    }
                }
                //If its not one of the preset commands then its a custom command
            } else {
                bot.say(to, commands[com[0]]);
            }
        }

        if (from == 'freakinjolly') {
            bot.say(to, 'STFU DIKO');
        } else {
            bot.say(to, 'You da best');
        }
    });
});