var storage = require('../services/storageDB');
var sorting = require('../public/client-services/model');

var notes = {
    notelist:[
        {id: 1, title: "Don't forget", taskDate: '27.05.2017', message: 'to go shopping', importance: 3, status: 'finished'},
        {id: 2,title: "Hospital visit", taskDate: 'finished', message: 'go visit teddy', importance: 2, status: 'open'},
        {id: 3,title: "For Declan", taskDate: '12.06.2017', message: 'swim school', importance: 1, status: 'open'}]
};

module.exports.showIndex = function (req, res) {

    console.log('noteslist',notes);
    res.sendFile('/index.html', {notelist: notes.notelist});

};

module.exports.retrieveNotes = function(){
    storage.retrieveAll();
};

module.exports.sortByTaskDate = function () {
      notes.sort(sorting.SortAndStore.sortByTaskDate);
};

module.exports.sortByCreationDate = function () {
    notes.sort(sorting.SortAndStore.sortByCreationDate);
};

module.exports.sortByImportanc = function () {
    notes.sort(sorting.SortAndStore.sortByImportance);
};

module.exports.showFinished = function () {
    notes.filter((item) => item.status ==='finished')
};

function sortByFinishDate(n1, n2) {
    return n1.taskDate - n2.taskDate;
}
