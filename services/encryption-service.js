const crypto = require("crypto");

/**
 * Encrypt a text
 * @param {string} content The content to be encrypted
 * @returns {string} The text encrypted
 */
module.exports = function encryptionService(content) {
  var encryptedData = '';
  var arraysQuantity = Math.ceil(content.length/100);
  for (let arrayIndex = 0; arrayIndex < arraysQuantity; arrayIndex++) {
    var textPart = content.substring(arrayIndex * 100, (arrayIndex + 1) * 100);
    encryptedData += encrypt(textPart);
    if(arrayIndex !== arraysQuantity - 1){
      encryptedData += '\n';
    }
  }
  return encryptedData;
}


function encrypt(content){
  var publicKey = process.env.PUBLIC_KEY;
  var encryptedData = crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(content)
  );
  var encryptedData = encryptedData.toString("base64");
  return encryptedData;
}