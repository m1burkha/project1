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
        //res.status(301).redirect('/index.html', {root: path.join(__dirname, '../public/html')});
    });

// retrieve / find the selected note, with a specific id, method GET, POST
router.route('/:id')
    .get(function(req,res) {
        controller.findNote(req, res);
        res.sendFile('/createnote.html', {root: path.join(__dirname, '../public/html')});
        res.end();
    })
    .put(function(req,res) {
        controller.updateNote(req.param('id'), res);
        res.end();
    });

module.exports = router;

