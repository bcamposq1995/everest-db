const listDirectoriesService = require("../services/list-directories-service");

/**
 * The get parent controller
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
function getParentController(_req, res){
    //Check object name
    var content = listDirectoriesService();
    return res.status(200).json(content);
}

module.exports = getParentController;