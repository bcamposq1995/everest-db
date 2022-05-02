const fs = require('fs');
const path = require('path');
const pathService = require('./path-service');
const encryptionService = require('./encryption-service');

module.exports = function updateFileService(objectName, id, content){
    var folderPath = path.join(pathService(), objectName);
    var fixedPath = path.join(folderPath, id);
    var stringJson = JSON.stringify(content);
    var encryptedData = encryptionService(stringJson);
    fs.writeFileSync(fixedPath, encryptedData);
}