const checkFileService = require('../services/check-file-service');
const deleteFileService = require('../services/delete-file-service');

/**
 * Delete controller
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
function deleteController(req, res){
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

    deleteFileService(objectName, documentId);

    return res.status(204).end();
}

module.exports = deleteController;