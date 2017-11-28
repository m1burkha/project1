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
module.exports.updateNoteStatus = function (req, res) {
    console.log("update checkbos status , id , status", req.params.id, req.query.status);
    storage.updateNoteStatus(req, res);
};


