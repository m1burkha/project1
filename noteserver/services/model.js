var storage = require('./storage.js');


class SortAndStore {

    // noinspection JSUnusedLocalSymbols
    sortByFinishDate(n1, n2) {
        // storage.retrieveAll();
        return n1.taskDate - n2.taskDate;
    }

    sortByCreationDate(n1, n2) {
        return n1.taskDate - n2.taskDate;
    }

    sortByImportance(n1, n2) {
        return n1.importance - n2.importance;
    }

    showFinish(notelist) {
        notelist.filter((item) => {
            return item.status === 'finished'
        });
    }

    retrieveList(name) {
        return JSON.parse(sessionStorage.getItem(name)); //notelist
    }

    storeList(name, storageItem) {
        sessionStorage.setItem(name, JSON.stringify(storageItem));
    }
}

class Note {

    constructor(...params) {

        let pp = params[0];
        this.title = params[0].title;
        this.message = params[0].message;
        this.importance = params[0].importance;
        this.taskDate = params[0].taskdate;
        this.status = params[0].status;
    }

    addNote() {
        storage.storeNote('notelist', this);
    }

    updateNote(note) {

        let index = notesStorage.indexOf(note);
        if (~index) {
            notesStorage[index] = note;
        }
    }
}

module.exports = {Note: Note, SortAndStore : new SortAndStore};

//
// function initStorage(name) {
//     const notesStorage = JSON.parse(sessionStorage.getItem(name) || "[ ]");
// }
