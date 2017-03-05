'use strict';

// import models
var visitor = require('./../models');

module.exports = function(app) {
    app.post('/registerVisitor', function(request, response) {
        visitor.Visitor.create();
    });
};