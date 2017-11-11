let express = require('express');
let path = require('path');

let routerIndex = express.Router({
    mergeParams: true
});
let controller = require('../controllers/controller-index.js');
let notelist = [];

routerIndex.use(function (req, res, next) {
    console.log('router-index request method and url: ', req.method, req.url);
    next();
});

// fetch the notelist
routerIndex.post('/', function(req, res) {
    controller.retrieveNotes(req, res);
});
module.exports = routerIndex;
