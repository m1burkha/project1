function noteList() {
    initStorage();

    // const noteList = {
    //     notes: [
    //         {taskdate: '27.05.2017', message: 'to go shopping', importance: 3, status: 'finished'},
    //         {taskdate: 'finished', message: 'go visit teddy', importance: 2, status: 'open'},
    //         {taskdate: '12.06.2017', message: 'swim school', importance: 1, status: 'open'}
    //     ]
    // };

    const noteList = JSON.parse(localStorage.getItem("notelist") || "[ ]");

    // Handlebars.registerHelper('repeat', (count) => {
    //     let text = '';
    //     if (count === 0)
    //         return '';
    //
    //     for (let i = 0; i < count; i++) {
    //         text += `<img src="assets/images/bolt-black.png" height="30" width="15"/>`;
    //     }
    //     let bb = Handlebars.Utils.escapeExpression(text);
    //     return new Handlebars.SafeString(text);
    // });
    //
    // const personHandler = Handlebars.compile(document.getElementById('routes-list').innerHTML);
    //
    // document.getElementById('item-list').innerHTML = personHandler(noteList);

}

function initStorage() {
    let notelist = [];
    notelist = JSON.parse(localStorage.getItem("notelist") || "[ ]");

    // if(!noteList){
    //     sessionStorage.setItem('notelist', JSON.stringify([]));
    //     noteList = JSON.parse(sessionStorage.getItem('notelist'));
    // }
}