const createFileService = require('./create-file-service');
const crypto = require('crypto');
const getFileService = require('./get-file-service');

module.exports = function addUser(userId){
    var id = crypto.randomUUID();
    createFileService(Buffer.from('everest_users').toString('base64'), id, {
        userId: userId,
        clientId: crypto.randomBytes(128).toString('hex'),
        clientSecret: crypto.randomBytes(128).toString('hex'),
        enable: true
    });
    var userCreated = getFileService(Buffer.from('everest_users').toString('base64'), id);
    return userCreated;
}