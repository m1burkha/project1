const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notelist.db', autoload: true });

function retrieveAll(){
    //return JSON.parse(localStorage.get("noteApp"));
    //db.getAllData()
}

function persist(storename){
    localStorage.set(storename, {list: JSON.stringify(notesApp)});
}

function storeNote(storageName,note) {
    notesApp.push(note);
    persist(storageName);
}

module.exports = {storeNote,retrieveAll};

