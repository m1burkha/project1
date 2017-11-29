let express = require('express');
let path = require('path');
let router = express.Router({
    mergeParams: true
});


router.get('/', function(req, res){
    res.sendFile("/index.html",  {root: path.join(__dirname, '../public/html')});
});


//routing to the create note page , method GET , POST
router.get('/createnote.html', function(req, res) {
        res.sendFile('/createnote.html', {root: path.join(__dirname, '../public/html')});
    });

module.exports = router;

