var registerHelper = function (hbs) {

    hbs.registerHelper('repeat', (count) => {
        let text = '';
        if (count === 0)
            return '';

        for (let i = 0; i < count; i++) {
            text += `<img src="/images/bolt-black.png" height="30" width="15"/>`;
        }
        let bb = hbs.Utils.escapeExpression(text);
        return new hbs.SafeString(text);
    });
};
module.exports.registerHelper = registerHelper;
