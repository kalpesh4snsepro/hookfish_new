var bcrypt = require('bcrypt-nodejs');
var common = exports;

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    crypto_password = 'd6F3Efeq';


common.encrypt = function(text) {

    if (typeof text != 'undefined') {

        var cipher = crypto.createCipher(algorithm, crypto_password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    } else {

        throw new Error("Empty value for function argument 'text' being passed in encrypt common function");
    }
}

common.decrypt = function(text) {

    if (typeof text != 'undefined') {
        try {

            var decipher = crypto.createDecipher(algorithm, crypto_password)
            var decrypted = decipher.update(text, 'hex', 'utf8')
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (e) {

            console.log(e);
        }
    } else {

        throw new Error("Empty value for function argument 'text' being passed in decrypt common function");
    }
}


/*common.generateHashPassword_old = function(password) {

    if (typeof password != 'undefined') {

        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    } else {

        throw new Error("Empty value for password being passed in generateHashPassword common function");
    }
}

common.validateHashPassword = function(password) {

    if (typeof password != 'undefined') {

        return bcrypt.compareSync(password, this.password);
    } else {

        throw new Error("Empty value for password being passed in generateHashPassword common function");
    }
}*/


common.sanitizeRequestBody = function(req, reqBodyObj) {

    Object.keys(reqBodyObj).forEach(function(key) {
        //console.log(key, reqBodyObj[key]);
        req.sanitize(key).trim();
    });
}

common.randomString = function(len, charSet) {

    len = len || 5;
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

common.generateResetToken = function(len, charSet) {

    return this.randomString(8);
}

module.exports = common;