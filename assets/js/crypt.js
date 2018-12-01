
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = '';
var notes = [];

exports.setPassword = function(text) {

    password = text;
}

exports.getPassword = function() {

    return password;
}

exports.setNotes = function(data) {

    notes = data;
}

exports.getNotes = function() {

    return notes;
}

exports.encryptFile = function(text) {

    text = JSON.stringify(text);
    let cipher = crypto.createCipher(algorithm, password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

decryptText = function(text) {

    let decipher = crypto.createDecipher(algorithm, password);
    let deciphered = decipher.update(text, 'hex', 'utf8');
    deciphered += decipher.final('utf8');

    try {
        deciphered = JSON.parse(deciphered);
    } catch(e) {
        deciphered = false;
    }

    return deciphered;
}

exports.decryptFile = function(text) {

    let text = decryptText(text);
    if(!text) {

        text = '';
    }
    return text;
}

exports.decryptFiles = function() {

    let decrypted = [];
    for (let i in notes) {
    
        name = notes[i].name;
        content = decryptText(notes[i].content);

        if(content) {

            decrypted.push(content);
        }
    }
    return decrypted;
}
