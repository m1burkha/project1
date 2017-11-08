;(function ($) {

    const notes = {
        notelist: [
            {
                id: 1,
                title: 'My shopping list',
                taskDate: '27.05.2017',
                message: 'to go shopping',
                importance: 3,
                status: 'finished'
            },
            {
                id: 2,
                title: 'Special visit',
                taskDate: '15.08.2017',
                message: 'go visit teddy',
                importance: 2,
                status: 'open'
            },
            {
                id: 4,
                title: 'New activity',
                taskDate: '12.06.2017',
                message: 'swim school',
                importance: 1,
                status: 'open'
            }
        ]
    };

    $(document).ready(function () {

        registerhandlebars();

        $.ajax({
            method: "GET",
            url: "/",
            data: data ? JSON.stringify(data): []
        }).done((data) => {
            console.log(data);
            //notelist.concat(JSON.stringify(data));
        });
    });

    $("#createnote").click(function(event) {
        event.stopPropagation();
    });

    $("#sort-taskdate").click((event) => {
        event.preventDefault();

    });

    $("#sort-creationdate").on("click", ((event) => {
        event.preventDefault();

    }));

    $("#sort-importance").on("click", ((event) => {
        event.preventDefault();

    }));

    $("#show-finished").on("click", ((event) => {
        event.preventDefault();

    }));

    $("body").on("click", ".taskstatus", (event) => {
        event.preventDefault();

    });

    $("body").on("click", ".button-styles", (event) => {
        event.preventDefault();

        let divId = event.target.parentNode.id;
        $.ajax({
            method: "GET",
            url: "/createnote/:" + divId,
            data: "note"
        }).done((data) => {

        })
    });


    function registerhandlebars() {

        Handlebars.registerHelper('repeat', (count) => {
            let text = '';
            if (count === 0)
                return '';

            for (let i = 0; i < count; i++) {
                text += `<img src="/images/bolt-black.png" height="30" width="15"/>`;
            }
            Handlebars.Utils.escapeExpression(text);
            return new Handlebars.SafeString(text);
        });

        Handlebars.registerHelper('ifcompleted', (taskstatus) => {
            return taskstatus === 'finished' ? ' finished' : '';
        });

        const template = Handlebars.compile($("#note-list").html());
        $("#item-list").append(template(notes.notelist));

    }

})(jQuery);
