const jwt = require('jsonwebtoken');

function authorizationService(token){
    try {
        var jwtResponse = jwt.verify(token, process.env.PUBLIC_KEY, {
            algorithms: ['RS256'],
            audience: 'everest_client',
            issuer: 'everest_security',
            ignoreExpiration: false
        });
        return jwtResponse;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = authorizationService;