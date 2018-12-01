
var path = require('path');
var fs = require('fs');
var home = '';
var notes = [];

exports.setHome = function(user) {

    home = path.join(user, 'httpsNotes');
}

exports.getNotes = function() {

    return notes;
}

exports.createFileName = function() {

  return Date.now();
}

getFilePath = function(name) {

    return path.join(home, name);
}

exports.getFileName = function(name) {

  return getFilePath(name);
}

exports.getFilePathName = function(name) {

  return getFilePath(name+".txt");
}

exports.getAllFiles = function() {

    notes = [];
    var files = fs.readdirSync(home);

    for (var i in files) {

        let path = getFilePath(files[i]);
        let data = fs.readFileSync(path, "utf8");
        notes.push({name: files[i], content: data});
    }
}

directoryExist = function(dir) {

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

fileExist = function(file) {

    return fs.existsSync(file);
}

exports.homeExist = function() {

    return directoryExist(home);
}

exports.fileExist = function(file) {

    return fileExist(file);
}

exports.writeFile = function(file, content) {

    let success = false;

    fs.writeFileSync(file, content, 'utf8');

    if(fileExist(file)) {
        success = true;
    }
    
    return success;
}

exports.unlinkFile = function(file) {

    let success = true;

    if(fileExist(file)) {
        fs.unlink(file,function(err){
            if(err){
            success = false;
            }
        });
    }

    if(fileExist(file)) {
        success = false;
    }
    
    return success;
}