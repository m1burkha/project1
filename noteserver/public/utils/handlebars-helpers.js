
Handlebars.registerHelper('repeat', (count) => {
    let text = '';
    if (count === 0)
        return '';

    for (let i = 0; i < count; i++) {
        text += `<img src="/images/bolt-black.png" height="30" width="15"/>`;
    }
    let bb = Handlebars.Utils.escapeExpression(text);
    return new Handlebars.SafeString(text);
});
const notelist = [];
const personHandler = Handlebars.compile(document.getElementById('note-list').innerHTML);
document.getElementById('item-list').innerHTML = personHandler(notelist);
