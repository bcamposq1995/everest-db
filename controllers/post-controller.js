const createFileService = require('../services/create-file-service');
const crypto = require('crypto');

/**
 * The post controller
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
function postController(req, res){
    //Check object name
    var originalObjectName = req.params.objectName;
    var objectName = req.params.objectName;
    if(!objectName){
        return res.status(400).send('No object name was specified');
    }

    objectName = Buffer.from(objectName).toString('base64');

    var body = req.body;
    body['id'] = crypto.randomUUID();
    body['createdAt'] = new Date();
    body['modifiedAt'] = new Date();

    createFileService(objectName, body['id'], body);

    return res.location(`/${originalObjectName}/${body['id']}`).end();
}

module.exports = postController;