'use strict';

const ContactForm = require('./contact');
const FormProcessing = new ContactForm();
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
});

router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact', SuccessMesssage: "Here" });
});

router.get('/error', function (req, res) {
    res.render('error', { title: 'Error 404' });
});

// Access the parse results as request.body
router.post('/contact', function(req, res){
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const mobile = req.body.mobile
    const email = req.body.email
    const message = req.body.message

    const UserMail = "Your Email Address";
    const UserMailPassword = "Your password";

    FormProcessing.SaveToDB(firstname, lastname, mobile, email, message);
    FormProcessing.SendMail(UserMail, UserMailPassword, firstname, lastname, mobile, email, message);

    res.end()
});


module.exports = router;