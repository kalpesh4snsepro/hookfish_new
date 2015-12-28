// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema_old = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

var userSchema = new mongoose.Schema({
    //_id :String,
    /*master_users :{*/
        
        username:{ type: String, default: "def_username" },
        email : { type: String, default: "def@email.com" },
        first_name :{ type: String, default: "def_fname" },
        last_name:{ type: String, default: "def_lname" },
        password:{ type: String, default: "default_password" },
        auth_key:{ type: String, default: "" },
        reset_token:{ type: String, default: "" },
        user_type: {type: String, enum: ['customer', 'broker'],default: "customer"},
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    /*}*/

  });
 

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/* user deined functions*/

// checking if password is valid
userSchema.methods.getUsername = function(email) {
    var arry = email.split("@");
    return arry[0];
};

userSchema.methods.randomString = function(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
};


// create the model for users and expose it to our app
module.exports = mongoose.model('master_users', userSchema);
