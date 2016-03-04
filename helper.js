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
