var router = require('express').Router({
    mergeParams: true
});

const controller = require('../controllers/controller-createnote.js');

// router.get('/',function (req, res) {
//     console.log('in the create routes route', req.path);
//     //res.send('You want to edit ' + req.params)
//     res.render('createnote');
// });

router.route('/')
    .get(function (req, res) {
        controller.createNote(req, res);
    })
    .post(function (req, res) {
        controller.storeNote(req, res);
    });

router.put('/:id', function (req, res) {
    controllerres.send('the id updated' + req.params.id);
    res.end();
});


//});
module.exports = router;

// module.exports = function (router) {
//
//     router.get('/createnote').get(function (req, res) {
//         console.log('in the create routes route');
//         res.send('You want to edit ' + req.params)
//     });
//
// };