let storage = require('../services/storageDB');


/*
* fetches all items for the task-list from the DB
* @reg , the request
* @res , the response returns an empty or filled json file
* */
module.exports.retrieveNotes = function (req, res) {
    storage.retrieveAll(req, function (err, notelist) {
        res.json(notelist || {});
    });
};



