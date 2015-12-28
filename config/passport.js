// config/passport.js
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../app/models/user');

var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-forgott', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, done) {
        process.nextTick(function() {
            console.log("hhhhhhh");
        })
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                var email = ((typeof req.body.email != 'undefined') ? req.body.email.trim() : 'default_email@email.com');
                //console.log(email);


                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    email: email
                }, function(err, user) {

                    //console.log("error-->" + err);
                    //console.log("user-->" + user);

                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {

                        console.log('That email is already taken.');
                        //    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        //console.log("in function");

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        newUser.email = ((typeof req.body.email != 'undefined') ? req.body.email.trim() : 'default_email@email.com');

                        newUser.password = ((typeof req.body.password != 'undefined') ? newUser.generateHash(req.body.password) : 'default_pwd');

                        newUser.first_name = ((typeof req.body.first_name != 'undefined') ? req.body.first_name.trim() : 'default_first_name');

                        newUser.last_name = ((typeof req.body.last_name != 'undefined') ? req.body.last_name.trim() : 'default_last_name');

                        newUser.username = ((typeof req.body.email != 'undefined') ? newUser.getUsername(req.body.email) : 'default_user_name');

                        newUser.auth_key = newUser.randomString(5);

                        newUser.user_type = ((typeof req.body.user_type != 'undefined') ? ((req.body.user_type == '1') ? 'customer' : 'broker') : 'customer');

                        newUser.save(function(err, savedUser) {

                            if (err)
                                throw err;
                            console.log('saved successfully:');
                            //return done(null, newUser);

                            /*if (err) {
                              console.log(err);
                            } else {
                            console.log(newUser);
                              console.log('saved successfully:', userObj);
                              res.json('saved successfully:'+userObj);
                              //res.json(userObj);
                            }*/
                        });
                    }

                });

            });

    }));


    // =========================================================================
    // LOCAL RESET PASSWORD =============================================================
    // =========================================================================
    // this strategy used to validate email and if it exists,send email containing reset // password link
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-reset', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, done) {

        User.findOne({
            email: email
        }, function(err, user) {

            console.log("in local reset")
            console.log(req.body);
            if (err)
                return done(err);

            if (user) {
                //if email id exists,send him email containing reset password link

                //generate link in email

                //show him message
                console.log("Mail sent to your email id");
            } else {
                console.log("Invalid email");
            }

            return done(null, User);
        })
    }));


    // =========================================================================
    // LOCAL FORGOT PASSWORD ====================================================
    // =========================================================================
    // this strategy used to reset password for email and if  containing reset
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-forgot1', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        console.log('in forgot passport');
        console.log(req.body);
        // asynchronous
        process.nextTick(function() {

            console.log('in forgot passport');
            console.log(req.body);
        });

        var email = ((typeof req.body.email != 'undefined') ? req.body.email.trim() : 'default_email@email.com');
        console.log(email);

        User.findOne({
            email: email
        }, function(err, user) {

            console.log("user found")
            console.log(req.body);
            if (err)
                return done(err);

            if (user) {
                //if email id exists,send him email containing reset password link

                //generate link in email

                //show him message
                console.log("Mail sent to your email id");
            } else {
                console.log("Invalid email");
            }

            return done(null, User);
        });
    }));


    /*------------------------------------------------------------------------------------------------------*/
    passport.use('local-login_new', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        //function(req, done) { // callback with email and password from our form
        function(req, email, done) {

            console.log("in local forgot")
            console.log(req.body);
            return;
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                email: email
            }, function(err, user) {

                console.log("-------");
                console.log(user);
                //return;
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user) {
                    console.log('No user found.')
                        // return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    console.log('Oops! Wrong password.')
                        //return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }

                // all is well, return successful user
                return done(null, User);
            });

        }));
    /*------------------------------------------------------------------------------------------------------*/



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        //function(req, done) { // callback with email and password from our form
        function(req, email, password, done) {

            console.log("in local login")
            console.log(req.body);
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                email: email
            }, function(err, user) {

                console.log("-------");
                console.log(user);
                //return;
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user) {
                    console.log('No user found.')
                        // return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    console.log('Oops! Wrong password.')
                        //return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }

                // all is well, return successful user
                return done(null, User);
            });

        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({
                    'facebook.id': profile.id
                }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

};