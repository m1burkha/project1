import sorting from "../client-services/sortlist.js";

/*
* The client-index-controller listens to the user interaction on the index page
* Each time the page is refreshed, navigated to the task list is fetched from the DB
*
* The sorting is done on the client side from the client-services/sortlist functions
* @$ the input event from the user interaction
*
* $(createnote) button click navigates to the createnote page, this event listener was added to stop button bubbling
* $(sort-by-finishdate) button click calls the sort function, sorts the task list for tasks that are finished, the other tasks follow below
* $(sort-creationdate) button click calls the sort function, sorts the task list by date
* $(sort-priority) button click calls the sort function , sorts the task list by the relevant priority / importance
* $(showfinished) button click calls the function, sorts and only shows the tasks that are finshed
* */

;(function ($) {

    // const notes = {
    //     list: [
    //         {
    //             _id: 1,
    //             title: 'My shopping list',
    //             taskDate: '27-05-2017',
    //             message: 'to go shopping',
    //             priority: 3,
    //             status: 'finished'
    //         },
    //         {
    //             _id: 2,
    //             title: 'Special visit',
    //             taskDate: '15-08-2017',
    //             message: 'go visit teddy',
    //             priority: 2,
    //             status: 'open'
    //         },
    //         {
    //             _id: 4,
    //             title: 'New activity',
    //             taskDate: '12-06-2017',
    //             message: 'swim school',
    //             priority: 1,
    //             status: 'open'
    //         },
    //         {
    //             _id: 5,
    //             title: 'Meeting at mall',
    //             taskDate: '14-06-2017',
    //             message: 'Meet up with friend from school',
    //             priority: 1,
    //             status: 'finished'
    //         }
    //
    //     ]
    // };

    let notelist = [];
    // notelist = notelist.concat(notes.list);
    let togglelist = false;

    $(document).ready(function () {

        registerhandlebars();

        $.ajax({
            method: "post",
            url: "/",
            data: "notelist"
        }).done((data) => {
            notelist = notelist.concat(data);
            rendernotelist(notelist);
        });
    });

    $("#createnote").click(function (event) {
        event.stopPropagation();
    });

    $("#sort-by-finishdate").click((event) => {
        event.preventDefault();
        let toggle = togglestate();
        notelist = notelist.sort(sorting.sortTaskListWithProperty(notelist,'finished', toggle));
        $("#item-list").empty();
        rendernotelist();
        event.stopPropagation();
    });

    $("#sort-creationdate").on("click", ((event) => {
        event.preventDefault();
        let toggle = togglestate();
        notelist = notelist.sort(sorting.sortTaskListWithProperty(notelist,'taskDate',toggle));
        $("#item-list").empty();
        rendernotelist();
        event.stopPropagation();
    }));

    $("#sort-priority").on("click", ((event) => {
        event.preventDefault();
        let toggle = togglestate();
        notelist = notelist.sort(sorting.sortTaskListWithProperty(notelist, 'priority', toggle));
        $("#item-list").empty();
        rendernotelist();
        event.stopPropagation();
    }));

    $("#show-finished").on("click", ((event) => {
        event.preventDefault();
        let toggle = togglestate();
        notelist = sorting.showFinish(notelist, toggle);
        $("#item-list").empty();
        rendernotelist();
        event.stopPropagation();
    }));

    $("body").on("click", ".taskstatus", (event) => {
        event.preventDefault();


        event.stopPropagation();
    });

    $("body").on("click", ".button-styles", (event) => {
        event.preventDefault();

        let divId = event.target.parentNode.id;
        $.ajax({
            method: "GET",
            url: `/createnote/${divId}`,
            data: 'note'
        }).done((data) => {
            console.log('selected note', data);
            window.location.href = `/createnote/:${data}`;
        })
    });

    // getOrder(id) {
    //     return ajaxUtil.ajax("GET", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    // }

    /*
    * Registers the handlebar helpers for the index page
    * helper repeat, repeats the number of icons to be display by the priority of the task
    * helper ifcompleted, checkbox selected setes the task status to finished
    * */
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
    }

    /*
    * The rendering od the data by the handlebar template
    * */
    function rendernotelist() {
        const template = Handlebars.compile($("#note-list").html());
        $("#item-list").append(template(notelist));
    }

    function togglestate() {
        return togglelist = ! togglelist;
    }

})(jQuery);
