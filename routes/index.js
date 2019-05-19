'use strict';
var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

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

    async function main(){

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "Your Username", // generated ethereal user
            pass: "Your Password" // generated ethereal password
          }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'Your Username', // sender address
          to: email, // list of receivers
          subject: "Contact Form Email", // Subject line
          text: message, // plain text body
          html:"<p> Email from "+firstname+ " "+ lastname+"</p>" + "<b>"+message+"</b>" // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        SuccessMesssage = "Mail sent successfully.";
        res.redirect('/contact' + SuccessMesssage);
      }
      
      main().catch(console.error);

    res.end()
});

module.exports = router;