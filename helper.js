var fs = require('fs');
//!command save !TITLE MESSAGE
//Parses the save command and returns it as input into the command storage
//Return the message in an array 0: title, 1: message
exports.newCommand = function (message) {
    var output = [];
    var arr = message.split(' ');
    output[0] = arr[2];
    output[1] = message.substring(14 + (arr[2].length));
    return output;
};

/*
 * Sets up bot preliminary data
 */
exports.setUp = function (callback) {
    var data = {};
    //Checks for the existence of the custom commands file, if not create one
    fs.access('./data/custom_commands.txt', fs.R_OK | fs.W_OK, (err) => {
        console.log(err ? 'no access!' : 'can read/write');
        if (err) {
            fs.writeFile('./data/custom_commands.txt', '', function (err) {
                if (err) throw err;
                console.log('new custom commands file created.');
                data.commands = {};
                callback(data);
            });
        } else {
            //Read the file and return the data stored as a hash
            fs.readFile('./data/custom_commands.txt', function (err, data) {
                if (err) throw err;
                console.log(data);
                //Parse the read file
                callback(data);
            });
        }
    });
};