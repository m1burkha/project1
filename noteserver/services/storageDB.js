const Datastore = require('nedb');
const db = new Datastore({filename: './data/notelist.db', autoload: true});

// retrieve the todolist from the DB
function retrieveAll(req, callback) {
    db.find({}, function (err, docs) {
        console.log('retrieving the note list from the DB');
        callback(err, docs);
    });
}

// find the selected note from the Db
function findNote(id, res, callback) {
    console.log(`find this id: ${req.params.id} from the db connection`);

    db.findOne({id: req.params.id}, function (err, docs) {
        if (callback) {
            callback(err, docs);
        }
    });
}

// store / save the newly created note
function storeNote(req, res, callback) {
    console.log('store note db connection');
    console.log('res.children', req);
    console.log('res.children', res.body);

    db.insert(res.body, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    })
}

// update and save the seleced note to the DB
function updateNote(req, res, callback) {
    console.log('update db connection');
    let note = findNote(req.params.id);
    if (note !== null) {
        db.update({id: note.id},
            {
                $set: {
                    title: note.title,
                    taskDate: note.taskDate,
                    message: note.message,
                    importance: note.importance,
                    status: note.status
                }
            },
            {multi: true},
            function (err, docs) {
                callback(err, docs);
            });
    }
}

module.exports = {storeNote, retrieveAll, findNote, updateNote};
