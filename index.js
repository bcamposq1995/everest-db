require('dotenv').config();
const express = require('express');
const app = express();
const postController = require('./controllers/post-controller');
const getController = require('./controllers/get-controller');
const deleteController = require('./controllers/delete-controller');
const patchController = require('./controllers/patch-controller');
const putController = require('./controllers/put-controller');
const getChildrenController = require('./controllers/get-children-controller');
const getParentController = require('./controllers/get-parents-controller');
const authorizationService = require('./services/authorization-service');
const defaultUserService = require('./services/default-user-service');
const tokenController = require('./controllers/token-controller');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Port specification
const port = process.env.PORT ? process.env.PORT : '3000';
console.log(`The port assigned is ${port}`);

defaultUserService();

app.use((req, res, next) => {
    //Logging the IP
    console.log(req.ip);
    
    if(req.path !== '/security/token'){
        //Validating the bearer
        if(!req.headers.authorization){
            return res.status(401).send('Need an authorization header');
        }
        var bearer = req.headers.authorization;
        if(bearer.split(' ').length !== 2){
            return res.status(401).send('Invalid bearer');
        }
        token = bearer.split(' ')[1];
        try {
            var tokenResponse = authorizationService(token);
            if(!tokenResponse){
                return res.status(401).send('Invalid token');
            }
        } catch (error) {
            return res.status(401).send(error.message);
        }
    }
    next();
});


app.get('/:objectName/:id', getController);
app.get('/:objectName/:start/:size', getChildrenController);
app.get('/:objectName', getParentController);
app.post('/:objectName', postController);
app.post('/security/token', tokenController);
app.delete('/:objectName/:id', deleteController);
app.patch('/:objectName/:id', patchController);
app.put('/:objectName/:id', putController);

app.listen(port, () => {
    console.log(`The service is listening on port ${port}`);
});