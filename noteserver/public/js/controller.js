import {model} from '../services/modeljs';
import {sorting} from '../controllers/controller-index.js';

(function ($) {

    let note = {};

     $("#formnote").submit((event) => {
        event.preventDefault();

        let $inputs = $('#formnote :input');

        note.title = $inputs[0].value;
        note.message = $inputs[1].value;
        note.status = 'open';
        note.taskdate = $inputs[7].value;
        let n = model.Note(note);
        n.addNote();

    });

    $("#date-picker").datepicker({
        showOn: "button",
        buttonImage: "/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy'
    });


    $("body").on("click", ".selection", (event) => {
        event.preventDefault();
        note.importance = event.target.value;
    });


    $("#sort-taskdate").click((event) => {
        event.preventDefault();
        sorting.sortByTaskDate;
    });

    $("#sort-creationdate").on("click",((event) => {
        event.preventDefault();


    }));

    $("#sort-importance").on("click",((event) => {
        event.preventDefault();

    }));

    $("#show-finished").on("click",((event) => {
        event.preventDefault();

    }));

    function sortByFinishDate(n1, n2) {
        return n1.taskDate - n2.taskDate;
    }

    function updateNote() {


    }

    function retrieveList() {

    }


})(jQuery);
