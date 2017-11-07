function sortByFinishDate(n1, n2) {
    // storage.retrieveAll();
    return n1.taskDate - n2.taskDate;
}

function sortByCreationDate(n1, n2) {
    return n1.taskDate - n2.taskDate;
}

function sortByImportance(n1, n2) {
    return n1.importance - n2.importance;
}

function showFinish(notelist) {
    notelist.filter((item) => {
        return item.status === 'finished'
    })
};
