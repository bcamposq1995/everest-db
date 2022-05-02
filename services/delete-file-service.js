const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');

module.exports = function deleteFileService(objectName, id){
    var fixedPath = path.join(pathService(), objectName, id);
    fs.rmSync(fixedPath);
}