const checkFileService = require("../services/check-file-service");
const getFileService = require("../services/get-file-service");
const updateFileService = require("../services/update-file-service");

/**
 * The put controller
 * @param {Request} req The request body
 * @param {Response} res The response body
 */
function putController(req, res){
    //Check object name
    var objectName = req.params.objectName;
    if(!objectName){
        return res.status(400).send('No object name was specified');
    }

    objectName = Buffer.from(objectName).toString('base64');

    //Get document id
    var documentId = req.params.id;
    if(!documentId){
        return res.status(400).send('No object id was specified');
    }

    var documentExists = checkFileService(objectName, documentId);
    if(!documentExists){
        return res.status(404).send(`The object ${documentId} does not exist`);
    }

    var oldestDocument = getFileService(objectName, documentId);
    req.body['id'] = oldestDocument['id'];
    req.body['modifiedAt'] = new Date();;
    req.body['createdAt'] = oldestDocument['createdAt'];

    updateFileService(objectName, documentId, req.body);

    return res.status(204).end();
}

module.exports = putController;