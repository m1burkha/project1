/*
* The client-create-note-controoler listens to the users interactions
*
* @$ the event input, fefines what the user interaction was from the browser
* The #formnote is the submit button, the form with all data content gets submitted to the DB
* The #body on click listens to which icon the user clicks and sets the prioity of the task
* */


;(function ($) {

    let note = {};

    $("#formnote").submit((event) => {
        event.preventDefault();

        let $inputs = $("#formnote :input");

        note.title = $inputs[0].value;
        note.message = $inputs[1].value;
        note.status = 'open';
        note.taskDate = $inputs[7].value;
        if (note.priority === null)
            note.priority = 0;

        $.ajax({
            method: "POST",
            url: "/createnote",
            data: note,
            success: (() => {
                window.location.href = '/';
            })
        })
    });

    $("body").on("click", ".selection", (event) => {
        event.preventDefault();
        note.priority = event.target.value;
    });

    $("#date-picker").datepicker({
        showOn: "button",
        buttonImage: "/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd-mm-yy'
    });

})(jQuery);
