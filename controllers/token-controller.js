const createTokenService = require("../services/create-token-service");

/**
 * Token controller
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
function tokenController(req, res){
    var body = req.body;
    if(!body.clientId){
        return res.status(401).send('ClientId parameter is missing');
    }

    if(!body.clientSecret){
        return res.status(401).send('ClientSecret parameter is missing');
    }

    var clientId = body.clientId;
    var clientSecret = body.clientSecret;

    var token = createTokenService(clientId, clientSecret);

    if(!token){
        return res.status(401).send('Client info is invalid');
    }

    return res.status(200).send(token);
}

module.exports = tokenController;