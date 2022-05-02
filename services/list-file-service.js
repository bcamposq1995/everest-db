const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');
const getFileService = require('./get-file-service');
const checkDirectoryService = require('./check-directory-service');

module.exports = function listFileService(objectName, start, lenght){

    if(!checkDirectoryService(objectName)){
        return [];
    }

    var rootPath = pathService();
    var fixedPath = path.join(rootPath, objectName);
    var filesList = fs.readdirSync(fixedPath, { withFileTypes: true });
    //paginate
    filesList = filesList.slice((start - 1) * lenght, start * lenght);

    var list = [];
    filesList.forEach(file => {
        var obj = getFileService(objectName, file.name);
        list.push(obj);
    });
    return list;
}