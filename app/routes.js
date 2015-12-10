module.exports = function(app, fs) {

    var route_path = require('../routes');

    //this array contaibs routes name to be used in application
    var pagesArray = [
    
            { name: 'index' }, 
            { name: 'users' }, 
            { name: 'signup' }, 
            { name: 'login' }, 
            { name: 'reset' }, 
            { name: 'forgot' }, 
    ];


    //This loop get route name and register it with app for use
    pagesArray.forEach(function(pageObj) {

        if (fs.existsSync('./routes/' + pageObj.name + '.js')) {

            if (pageObj.name == 'index') {
                var routes = require('../routes/index');
                app.use('/', routes);
            } else {

                var route_name = require('../routes/' + pageObj.name + '');
                app.use('/' + pageObj.name + '', route_name);
            }

            //console.log("The "+pageObj.name+".js file exists in /routes folder");

        } else {

            //console.log("The "+pageObj.name+".js file doesnt exist in /routes folder")
            throw new Error("The " + pageObj.name + ".js file doesnt exist in /routes folder");

        }

    });

}