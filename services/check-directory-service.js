const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');

/**
 * Check if the directory exists
 * @param {string} objectName The object type/directory name
 * @returns {boolean} Indicates if it exist
 */
module.exports = function checkDirectory(objectName){
    var fixedPath = path.join(pathService(), objectName);
    return fs.existsSync(fixedPath);
}