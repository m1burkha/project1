//import {default as model} from '../../services/model.js';
import * as model from '../../services/model.js';


export default (function ($) {

    let note = {};

    $("#createnote").click((event) => {

        window.location.href = "/createnote";
    });


    $("#formnote").submit((event) => {
        event.preventDefault();

        let $inputs = $('#formnote :input');

        note.title = $inputs[0].value;
        note.message = $inputs[1].value;
        note.status = 'open';
        note.taskdate = $inputs[7].value;
        let n = new model.Note(note);
        n.addNote();

    });

    $("#date-picker").datepicker({
        showOn: "button",
        buttonImage: "../public/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy'
    });

    // $(document).on('click', '.selection', (event) =>{
    //     note.importance = event.target.value;
    // });

    $("body").on("click", ".selection", (event) => {
        event.preventDefault();
        note.importance = event.target.value;
    });

    $("body").on("change", ".todo-list", (event) => {
        event.preventDefault();
        let pp = event.currentTarget.children[0].innerText;
        alert('checkbox' + pp + 'clicked');
    });

    function updateNote() {


    }

    function retrieveList() {

    }


})(jQuery);
