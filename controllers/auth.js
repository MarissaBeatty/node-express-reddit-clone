var express = require('express');

module.exports = function(myReddit) {
    var authController = express.Router();
    
    authController.get('/login', function(request, response) {
        response.render('login-form');
    });
    
    authController.post('/login', function(request, response) {
        myReddit.checkUserLogin(request.body)
       if(Error.code === '401') {
           throw new Error('401 Unauthorized');
       } else {
           var userId = myReddit.checkUserLogin.userId
        //   res.send(myReddit.checkUserLogin.username);
            myReddit.createUserSession(userId)
            response.cookie('SESSION', response.createUserSession)
            .then(response.redirect('/'))
        }
    })
    
    authController.get('/signup', function(request, response) {
        response.render('signup-form');
    });
    
    authController.post('/signup', function(request, response) {
        myReddit.createUser(request.body) 
        .then (myReddit.createUser.response) 
        .then(response.redirect('/auth/login'));
    });
   
    return authController;
};


