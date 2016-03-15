var config = require('./config/config.js');
var irc = require('irc');
var helper = require('./helper.js');
var fs = require('fs');
var path = './data/custom_commands.txt';

//Setup returns a hash with the tools necessary to run the bot.
helper.setUp(function (data) {

    console.log(JSON.stringify(data));
    var commands = data;

    helper.cleanUp(function () {
        var commandsText = '';
        console.log("CLEANUP HAPPENING");
    });

    var bot = new irc.Client(config.server, config.username, {
        channels: config.channels,
        port: config.port,
        userName: config.username,
        password: config.oauth
    });

    bot.addListener('message', function (from, to, message) {
        //ADD COMMAND TO POLL 1'S AND 2'S


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
                        var text = newCommand[0] + ':' + newCommand[1] + ';';
                        //Duplicate handling
                        if (newCommand[0] in commands) {
                            fs.readFile(path, 'utf8', function (err, data) {
                                if (err) throw err;
                                console.log('duplicate read');
                                var commandReplace = newCommand[0] + ':' + commands[newCommand[0]] + ';';
                                var result = data.replace(commandReplace, text);
                                fs.writeFile(path, result, 'utf8', function (err) {
                                    if (err) throw err;
                                    commands[newCommand[0]] = newCommand[1];
                                });
                            });
                        } else {
                            fs.appendFile(path, text, function (err) {
                                if (err) throw err;
                                bot.say(to, 'Command ' + newCommand[0] + ' saved!');
                                commands[newCommand[0]] = newCommand[1];
                            });
                        }
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