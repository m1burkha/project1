const store = require('../services/storageDB');

/*
* Save the new created note / task to the DB
* @createnote, the object to be stored
* */
module.exports.storeNote = function (creatednote) {
    store.storeNote('newnote',creatednote);
};

/*
* Update the selected task, from the task list
* @ req , the request the task by id to update
* @res, the response 200, 404, 500 etc
* */
module.exports.updateNote = function (req, res) {
    console.log('update note by id: ', res,params.id);
    store.updateNote(req, res);
};

/*
* Find the selected task from the DB
* @ req, the requested id to find
* @ res , the response of the found task or empty
* */
module.exports.findNote = function (req, res) {
    console.log('find note by id: ', req.params.id);
    store.findNote(req.params.id , function(err, note){
        res.json(note);
    });
};