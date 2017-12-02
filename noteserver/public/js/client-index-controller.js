import sorting from "../client-services/sortlist.js";
import storeAppColor from "../client-services/localstorage.js";
import http from "../client-services/http-services.js";

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
    let notelist=[];
    let togglelist = false;

    storeAppColor.AppStorage.retrieveAppColors();

    $(document).ready(function () {

        registerhandlebars();

        http.getNoteList((callback) =>{
            notelist = [...callback];
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
        let finishlist = sorting.sortByFinishDate(notelist, toggle);
        notelist.length = 0;
        notelist = finishlist;
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

        event.stopPropagation();
        let divId = event.target.parentNode.parentElement.id;
        if (event.target.checked) {
            event.target.labels[0].childNodes[1].data += " finished";
            http.toggleCheckBox(divId, "finished");
            location.reload();
            return;
        } else {
            let text = event.target.labels[0].childNodes[1].data;
            if (text.indexOf("finished") !== -1) {
                event.target.labels[0].childNodes[1].data = text.substring(0, (text.length - 9));
                http.toggleCheckBox(divId, "open");
                location.reload();
            }
            return;
        }
    });

    $("body").on("click", ".button-styles", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let divId = event.target.parentNode.id;
        window.location =`/createnote.html?id=${divId}`;
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

        Handlebars.registerHelper('ifchecked', (status) => {
            return status === 'finished' ? "checked" : '';
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
