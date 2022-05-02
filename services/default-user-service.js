const createFileService = require("./create-file-service");
const listFileService = require("./list-file-service");
const crypto = require('crypto');

module.exports = function defaultUserService(){
    var containsUser = listFileService(Buffer.from('everest_users').toString('base64'), 1, 1);
    if(containsUser.length === 0){
        var clientId = !process.env.DEFAULT_CLIENT_ID ? crypto.randomBytes(128).toString('hex') : process.env.DEFAULT_CLIENT_ID;
        var clientSecret = !process.env.DEFAULT_CLIENT_SECRET ? crypto.randomBytes(128).toString('hex') : !process.env.DEFAULT_CLIENT_SECRET;
        var userId = 'DEFAULT_ADMIN';
        console.log(`Creating default user clientId: ${clientId} clientSecret: ${clientSecret}`);

        var id = crypto.randomUUID();
        createFileService(Buffer.from('everest_users').toString('base64'), id, {
            userId: userId,
            clientId: clientId,
            clientSecret: clientSecret,
            enable: true
        });
    }
}