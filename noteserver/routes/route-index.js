var router = require('express').Router({
    mergeParams: true
});
var controller = require('../controllers/controller-index.js');

router.get('/', function (req, res) {
    controller.showIndex(req, res);
});

module.exports = router;
