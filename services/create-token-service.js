const jwt = require('jsonwebtoken');
const listFileService = require('./list-file-service');
const crypto = require('crypto');

function createTokenService(clientId, clientSecret){

    var users = listFileService(Buffer.from('everest_users').toString('base64'), 1, Number.MAX_VALUE);

    var userClient = users.filter(x => x.clientId == clientId && x.clientSecret == clientSecret && x.enable);

    if(!userClient){
        return null;
    }

    var token = jwt.sign({}, process.env.PRIVATE_KEY, {
        expiresIn: 5,
        algorithm: 'RS256',
        subject: clientId,
        issuer: 'everest_security',
        audience: 'everest_client',
        jwtid: crypto.randomUUID()
    });
    return token;
}

module.exports = createTokenService;