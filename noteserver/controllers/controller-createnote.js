const store = require('../services/storageDB');

// create a new note

// save the newly created note
module.exports.storeNote = function (creatednote) {
    store.storeNote('newnote',creatednote);
};
//update and save the selected note
module.exports.updateNote = function (req, res) {
    console.log('update note by id: ', res,params.id);
    store.updateNote(req, res);
};
// find the selected note
module.exports.findNote = function (req, res) {
    console.log('find note by id: ', req.params.id);
    store.findNote(req.params.id , function(err, note){
        res.json(note);
    });
};

