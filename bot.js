var config = require('./config/config.js');
var irc = require('irc');
var helper = require('./helper.js');
var fs = require('fs');

//Setup returns a hash with the tools necessary to run the bot.
helper.setUp(function (data) {
    
    console.log(JSON.stringify(data));
    var commands = data;
    
    //On exit, save everything currently in commands into the file
    
    //CHANGE THE ERROR HANDLING, THIS ISNT GOOD FOR A PROGRAM YOU WANT TO SUSTAIN 
    //FOREVER, we don't want the bot to continously exit just to commit data
    helper.cleanUp(function() {
        var commandsText = '';
        console.log("CLEANUP HAPPENING");
        for (var key in commands) {
            console.log('looping');
            if(commands.hasOwnProperty(key)) {
                commandsText = commandsText.concat(key + ':' + commands[key] + ';');
            }
        }
        console.log(commandsText);
//        fs.writeFileSync('./data/custom_commands.txt', 'commandsText', 'utf-8', function(err) {
//            if (err) throw err;
//            console.log('write');
//        });
    });
    
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
                        commands[newCommand[0]] = newCommand[1];
//                        var text = newCommand[0] + ':' + newCommand[1] + ';';
//                        fs.appendFile('./data/custom_commands.txt', text, function (err) {
//                            if (err) throw err;
//                            bot.say(to, 'Command ' + newCommand[0] + ' saved!');
//                        });
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