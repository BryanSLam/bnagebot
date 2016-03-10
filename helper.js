var fs = require('fs');
//!command save !TITLE MESSAGE
//Parses the save command and returns it as input into the command storage
//Return the message in an array 0: title, 1: message
exports.newCommand = function (message) {
    var output = [];
    var arr = message.split(' ');
    output[0] = arr[2];
    output[1] = message.substring(15 + (arr[2].length));
    return output;
};

/*
 * Sets up bot preliminary data
 */
exports.setUp = function (callback) {
    var hash = {};
    //Checks for the existence of the custom commands file, if not create one
    fs.access('./data/custom_commands.txt', fs.R_OK | fs.W_OK, (err) => {
        console.log(err ? 'no access!' : 'can read/write');
        if (err) {
            fs.writeFile('./data/custom_commands.txt', '', function (err) {
                if (err) throw err;
                console.log('new custom commands file created.');
                callback(hash);
            });
        } else {
            //Read the file and return the data stored as a hash
            fs.readFile('./data/custom_commands.txt', 'utf-8', function (err, data) {
                if (err) throw err;

                if (data != '') {
                    //Parse the read file
                    var i = 0;
                    var arr = data.split(';');
                    var temp = [];
                    for (i = 0; i < arr.length; i++) {
                        temp = arr[i].split(':');
                        hash[temp[0]] = temp[1];
                    }
                }
                callback(hash);
            });
        }
    });
};

/*
 * Cleanup function, Feeds in the cleanup function that you're using when the bot exits.
 */
exports.cleanUp = function (callback) {
    process.on('cleanup', callback);

    process.on('exit', function () {
        process.emit('cleanup');
    });

    //Note the exit, then call the exit process
    process.on('SIGINT', function () {
        console.log('CTR C');
        process.exit(2);
    });

    process.on('uncaughtException', function (e) {
        console.log('Uncaught Exception: ');
        console.log(e.stack);
        process.exit(99)
    })
};