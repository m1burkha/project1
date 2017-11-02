const store = require('../services/storage.js');
const model = require('../services/model.js');

module.exports.createNote = function (req, res) {
    res.render('createnote');
};

module.exports.storeNote = function (req, res) {
    const note = new model.Note();
    store.storeNote()
}

module.exports.updateNote = function (req, res) {
    const id = req.params.id;
    //store.up
}


