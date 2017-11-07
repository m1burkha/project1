let storage = require('../services/storageDB');

module.exports.retrieveNotes = function (req, res) {
    storage.retrieveAll(function (err, notelist) {
        res.json(notelist || {});
    });
};



