const crypto = require("crypto");

module.exports = function decryptionService(encryptedContent) {
    var decryptedData = '';
    var arrays = encryptedContent.split('\n');
    for (let arrayIndex = 0; arrayIndex < arrays.length; arrayIndex++) {
        var textPart = arrays[arrayIndex];
        decryptedData += decrypt(Buffer.from(textPart, 'base64'));
    }
    return decryptedData;
}

function decrypt(encryptedContent){
    var decryptedData = crypto.privateDecrypt({
        key: process.env.PRIVATE_KEY,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    encryptedContent
    );
    return decryptedData.toString();
}