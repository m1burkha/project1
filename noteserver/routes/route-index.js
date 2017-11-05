var router = require('express').Router({
    mergeParams: true
});
var controller = require('../controllers/controller-index.js');

router.get('/', function (req, res) {
    controller.retrieveNotes();
    controller.showIndex(req, res);
});
router.post('/', function (req, res) {
    console.log(req);
    res.send('Form submitted');
    res.end();

});
// router.get('/123', function (req,res) {
//     controller.sortByTaskDate;
// })

module.exports = router;
