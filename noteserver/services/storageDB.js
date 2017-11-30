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
function findNote(id, callback) {
    db.findOne({_id: id}, function (err, docs) {
        console.log(`retrieve note with id: ${id} from db`);
        callback(err, docs);
    });
}


// store / save the newly created note
function storeNote(req, res, callback) {
    console.log('store note db connection',req.body);
    db.insert(req.body, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    })
}

// update and save the seleced note to the DB
function updateNote(req, res, callback) {
    console.log('update db connection', req.params.id, req.body);
    db.update({_id: req.params.id},
        {
            $set: {
                title: req.body.title,
                taskDate: req.body.taskDate,
                message: req.body.message,
                importance: req.body.importance,
                status: req.body.status
            }
        },
        {multi: true},
        function (err, docs) {
            if (callback) {
                callback(err, docs);
            }
        });
}

function updateNoteStatus(req, res, callback) {
    console.log('update status db connection params, query', req.params, req.query);
    db.update({_id: req.params.id},
        {
            $set: {
                status: req.query.status
            }
        },
        function (err, docs) {
            if (callback) {
                callback(err, docs);
            }
        });
}

module.exports = {storeNote, retrieveAll, findNote, updateNote, updateNoteStatus};
