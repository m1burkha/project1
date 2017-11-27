import sorting from "../client-services/sortlist.js";
import storeAppColor from "../client-services/localstorage.js";
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
    let notelist = [];
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

    $("#dropdown-color").change(function () {

        let saveColor = new storeAppColor.AppStorage();
        let index = parseInt($(this).val().valueOf());
        switch (index) {
            case 1:
                saveColor.deleteAppColors();
                document.querySelector('body').classList.remove("bodyColor");
                break;
            case 2:
                saveColor.storeAppColors("bodyColor");
                document.querySelector('body').classList.add("bodyColor");
                break;
        }

    });

    $("#sort-by-finishdate").click((event) => {
        event.preventDefault();
        let toggle = togglestate();
        notelist = notelist.sort(sorting.sortTaskListWithProperty(notelist, 'finished', toggle));
        $("#item-list").empty();
        rendernotelist();
        event.stopPropagation();
    });

    $("#sort-creationdate").on("click", ((event) => {
        event.preventDefault();
        let toggle = togglestate();
        notelist = notelist.sort(sorting.sortTaskListWithProperty(notelist, 'taskDate', toggle));
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

        // var $checkbox = $(this).find(':checkbox');
        // $checkbox.prop('checked', !$checkbox[0].checked);
        let divId = event.target.parentNode.id;
        $.ajax({
            method: "PUT",
            url: `/createnote/:${divId}`,
            data: JSON.stringify("note")
        }).done((data) => {
            window.location = "/createnote/";
        });


        // if(event.target.checked){
        //     event.target.labels[0].childNodes[1].data +=" finished";
        //     event.target.defaultChecked = true;
        //
        // }else{
        //     event.target.labels[0].childNodes[1].data.splice(-1, 9);
        //     event.target.defaultChecked = false;
        // }
        event.preventDefault();

        event.stopPropagation();
    });

    $("body").on("click", ".button-styles", (event) => {
        event.preventDefault();

        let divId = event.target.parentNode.id;
        $.ajax({
            method: "GET",
            url: `/createnote/${divId}/`,
            data: 'note'
        }).done((data) => {
            console.log('selected note', data);
            if (data) {
                let note = JSON.stringify(data);
                window.location.replace(`/createnote/:${note}`);
                //window.location = (`/createnote/: ${divId}?=${note}`);
                //window.location = (`/createnote/:${divId}`);
            }
        })
    });

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
        return togglelist = !togglelist;
    }

})(jQuery);
