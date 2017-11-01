var router = require('express').Router({
    mergeParams: true
});

//const controller = require('../public/controller/controller.js');

// router.get('/',function (req, res) {
//     console.log('in the create note route', req.path);
//     //res.send('You want to edit ' + req.params)
//     res.render('createnote');
// });

router.route('/')
    .get(function (req, res) {
        res.render('createnote');
    })
    .post(function (req, res) {
        res.send('Add a new note');
    });

router.put('/:id', function (req, res) {
    res.send('the id updated' + req.params.id);
    res.end();
});


//});
module.exports = router;

// module.exports = function (router) {
//
//     router.get('/createnote').get(function (req, res) {
//         console.log('in the create note route');
//         res.send('You want to edit ' + req.params)
//     });
//
// };