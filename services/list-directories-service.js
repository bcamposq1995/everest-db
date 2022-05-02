const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');

module.exports = function listDirectoriesSerice(){
    var rootPath = pathService();
    var filesList = fs.readdirSync(rootPath, { withFileTypes: true }).filter(x => x.isDirectory);
    return filesList.map(x => Buffer.from(x.name, 'base64').toString('ascii'));
}