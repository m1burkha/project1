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
    //res.sendFile('/index.html',  {root: path.join(__dirname, '../public/html')});
    //console.log('req', req.body.notelist);
    // res.render('/index.html',  {
    //     root: path.join(__dirname, '../public/html'),
    //     notelist: req.body.notelist});

});
module.exports = routerIndex;
