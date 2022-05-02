const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');

module.exports = function createDirectoryService(objectName){
    var rootPath = pathService();
    var fixedPath = path.join(rootPath, objectName);
    fs.mkdirSync(fixedPath);
}