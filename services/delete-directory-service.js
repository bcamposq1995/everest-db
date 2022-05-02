const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');

/**
 * Delete a directory
 * @param {string} objectName The object name
 */
module.exports = function deleteDirectoryService(objectName){
    var rootPath = pathService();
    var fixedPath = path.join(rootPath, objectName);
    fs.rmdirSync(fixedPath, { recursive: true, force: true });
}