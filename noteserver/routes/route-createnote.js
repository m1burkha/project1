let express = require('express');
let path = require('path');
let router = express.Router({
    mergeParams: true
});


// reference to the server controller
const controller = require('../controllers/controller-createnote.js');


router.use(function (req, res, next) {
   console.log('router-createnote request method and url: ', req.method, req.url);
   next();
});
//routing to the create note page , method GET , POST
router.route('/')
    .get(function(req, res) {
        res.sendFile('/createnote.html', {root: path.join(__dirname, '../public/html')});
    })
    .post(function(req, res){
        controller.storeNote(req, res);
        res.end();
    });


// retrieve / find the selected note, with a specific id, method GET, PUT
router.route('/:id/')
    .get(function(req,res) {
        controller.findNote(req, res);
        console.log("req params",req.params);
        console.log("req query",res.query);
        //res.sendFile('createnote.html', {root: path.join(__dirname, '../public/html')});
    })
    .post(function(req,res) {
        console.log("post with params", req.params);
        controller.updateNote(req, res);
        //res.send(req.params);
        res.end();
    });

module.exports = router;

