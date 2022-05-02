const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');

/**
 * Check if the file exists
 * @param {string} objectName The document directory
 * @param {number} id The id of the document
 * @returns {object}
 */
module.exports = function checkFileService(objectName, id){
    var rootPath = pathService();
    var fixedPath = path.join(rootPath, objectName, id);
    var documentExists = fs.existsSync(fixedPath);
    return documentExists;
}