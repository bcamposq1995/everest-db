const listFileService = require("../services/list-file-service");

/**
 * The get children controller
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
function getChildrenController(req, res){

    //Check object name
    var objectName = req.params.objectName;
    if(!objectName){
        return res.status(400).send('No object name was specified');
    }

    objectName = Buffer.from(objectName).toString('base64');

    var start = req.params.start;
    if(!start){
        return res.status(400).send('No start index was specified');
    }

    var size = req.params.size;
    if(!size){
        return res.status(400).send('No size index was specified');
    }

    var content = listFileService(objectName, start, size);

    return res.status(200).json(content);
}

module.exports = getChildrenController;