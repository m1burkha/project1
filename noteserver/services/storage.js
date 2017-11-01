const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notelist.db', autoload: true });

const notesApp = JSON.parse(localStorage.getItem("noteApp") || "[ ]");

function retrieveAll(){
    return JSON.parse(localStorage.getItem("noteApp"));
    db.getAllData()
}

function persist(storename){
    localStorage.setItem(storename, JSON.stringify(notesApp));
}

function storeNote(storageName,note) {
    notesApp.push(note);
    persist(storageName);
}

//export default {storeNote,retrieveAll};
module.exports = {retrieveall : retrieveAll(), saveNote : storeNote};

