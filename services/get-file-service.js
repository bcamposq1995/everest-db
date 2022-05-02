const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');
const decryptionService = require('./decryption-service');

module.exports = function getFileService(objectName, id){
    var rootPath = pathService();
    var fixedPath = path.join(rootPath, objectName, id);
    var buffer = fs.readFileSync(fixedPath);
    var content = buffer.toString();
    var decryptedContent = decryptionService(content);
    return JSON.parse(decryptedContent);
}