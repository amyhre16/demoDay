'use strict';

// import node packages
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// create connection to the express server
var app = express();

// execute the files in the models folder and store what is being exported in db
var db = require('./models');

// give whatever is being rendered to page access to public folder
app.use(express.static(__dirname + "/public"));

// set up Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// override with POST having ?_method=
app.use(methodOverride("_method"));

// pass the server into controller/demo_controller.js so that the controller has access to the server
require('./controller/demo_controller')(app);

// set up app for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*
    syncronize the models to the tables in the database
    because I don't want sequelize to drop the tables, I'm passing in an empty object to the sequelize method
*/
db.sequelize.sync({}).then(function() {
    /*
        run the server
            if it is local, run on port 8080
            otherwise, run on the port determined by heroku
    */
    app.listen(process.env.PORT || 8080, function() {
        // console message so that I know the server is running
        console.log("App is listening");
    }); // end of app.listen
}); // end of db.sequelize