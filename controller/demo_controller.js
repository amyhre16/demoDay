'use strict';

// import models
var visitor = require('./../models');

module.exports = function(app) {
    app.get('/', function(request, response) {
        response.render('register');
    });

    app.get('/invalidEmail', function(request, response) {
        response.render('invalidEmail');
    });

    app.post('/registerVisitor', function(request, response) {
        console.log(request.body);
        if (ValidateEmail(request.body.visitor_email)) {
            visitor.Visitor.create({
                visitor_name: request.body.visitor_name,
                visitor_email: request.body.visitor_email,
                visitor_company: request.body.visitor_company,
                visitor_linkedin: request.body.visitor_linkedin
            }, {validate: true}).then(function(results) {
                console.log(results);
                response.redirect('/');
            });
        }

        else {
            response.redirect('/invalidEmail');
        }
    });
};


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    else {
        return false;
    }
}