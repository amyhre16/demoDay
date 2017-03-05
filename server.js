'use strict';

var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var app = express();

var db = require('./models');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride("_method"));

require('./controller/demo_controller')(app);

db.sequelize({}).then(function() {
    app.listen(process.env.PORT || 8080, function(){
        console.log("App is listening");
    });
});