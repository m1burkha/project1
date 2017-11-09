let storage = require('../services/storageDB');

module.exports.retrieveNotes = function (req, res) {
    storage.retrieveAll(req, function (err, notelist) {
        //console.log('fetched notelist',notelist || {});
        res.json(notelist || {});

    });
};



