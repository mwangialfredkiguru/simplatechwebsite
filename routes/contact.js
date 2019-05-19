'use strict';
var express = require('express');
var router = express.Router();

router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact' });
    console.log("Here");
});
module.exports = router;