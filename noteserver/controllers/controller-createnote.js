const store = require('../services/storageDB.js');
const model = require('../public/client-services/model.js');

module.exports.createNote = function (req, res) {
    res.sendFile('/createnote.html');
};

module.exports.storeNote = function (req, res) {
    const note = new model.Note();
    store.storeNote()
}

module.exports.updateNote = function (req, res) {
    const id = req.params.id;
    //store.up
}


