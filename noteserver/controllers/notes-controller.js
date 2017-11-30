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
    res.end();
};

/*
* Save the new created note / task to the DB
* @createnote, the object to be stored
* */
module.exports.storeNote = function (req, res) {
    storage.storeNote(req, res);
    res.end();
};

/*
* Update the selected task, from the task list
* @ req , the request the task by id to update
* @res, the response 200, 404, 500 etc
* */
module.exports.updateNote = function (req, res) {
    console.log('update note by id: ', req.params.id);
    storage.updateNote(req, res);
    res.end();
};

/*
* Find the selected task from the DB
* @ req, the requested id to find
* @ res , the response of the found task or empty
* */
module.exports.findNote = function (req, res) {
    console.log('find note by id ', req.params.id);
    storage.findNote(req.params.id , function(err, note){
        res.json(note);
    });
};