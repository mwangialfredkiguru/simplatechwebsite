﻿'use strict';
var express = require('express');
var router = express.Router();

router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact' });
});
module.exports = router;