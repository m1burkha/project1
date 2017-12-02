import storeAppColor from "../client-services/localstorage.js";
import http from "../client-services/http-services.js";
import model from "../model/note.js"
/*
* The client-create-note-controoler listens to the users interactions
*
* @$ the event input, fefines what the user interaction was from the browser
* The #formnote is the submit button, the form with all data content gets submitted to the DB
* The #body on click listens to which icon the user clicks and sets the prioity of the task
* */


;(function ($) {

    let note = {};
    storeAppColor.AppStorage.retrieveAppColors();
    let priority = 0;

    let parmsId = window.location.href.split("id=");

    $(document).ready(function () {

        if (parmsId[1]) {
            http.editNoteById(parmsId[1]);
        }
    });

    $("#formnote").submit((event) => {
        event.preventDefault();

        let $inputs = $("#formnote :input");
         note = new model.Note(
            $inputs[0].value,
            $inputs[1].value,
            'open',
            $inputs[7].value,
            priority
        );

        if (parmsId[1]) {
            http.updateNoteById(parmsId[1], note);
        } else {
            http.submitNote(note);
        }
    });

    $("body").on("click", ".selection", (event) => {
        event.preventDefault();
        priority = event.target.value;
        $(".selection").removeClass("selection-border");
        event.target.classList.toggle("selection-border")
    });

    $("#date-picker").datepicker({
        showOn: "button",
        buttonImage: "/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd-mm-yy'
    });

})(jQuery);
