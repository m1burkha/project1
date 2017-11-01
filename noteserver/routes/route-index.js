var router = require('express').Router({
    mergeParams: true
});


router.get('/', function (req, res) {
    //console.log('entered the index router for redering');
    res.render('index');
    //res.sendFile('/noteserver/public/html/index.html');

});

router.use('/createnote', require('./route-createnote.js'));
module.exports = router;

// module.exports = function (router) {
//
//     router.get('/', function (req, res) {
//         //console.log('entered the index router for redering');
//         res.render('index');
//
//     });
// };
