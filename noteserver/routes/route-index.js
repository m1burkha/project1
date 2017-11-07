let express = require('express');
let path = require('path');
let router = express.Router({
    mergeParams: true
});
let controller = require('../controllers/controller-index.js');

router.use(function (req, res, next) {
    console.log('router-index request method and url: ', req.method, req.url);
    next();
});

// fetch the notelist
router.get('/', function(req, res) {
     //controller.retrieveNotes(req,res);
    res.sendFile('/index.html',  {root: path.join(__dirname, '../public/html')});
});
module.exports = router;
