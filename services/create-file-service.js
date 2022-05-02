const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');
const checkDirectoryService = require('./check-directory-service');
const createDirectoryService = require('./create-directory-service');
const encryptionService = require('./encryption-service');

/**
 * Create a file
 * @param {string} objectName The object name
 * @param {number} id The object id
 * @param {object} content The object
 */
module.exports = function createFileService(objectName, id, content){
    var folderPath = path.join(pathService(), objectName);
    var folderExists = checkDirectoryService(objectName);
    if(!folderExists){
        createDirectoryService(objectName);
    }
    var fixedPath = path.join(folderPath, id);
    var stringJson = JSON.stringify(content);
    var encryptedData = encryptionService(stringJson);
    fs.writeFileSync(fixedPath, encryptedData);
}