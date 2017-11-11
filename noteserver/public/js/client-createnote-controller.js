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

        let $inputs = $('#formnote :input');

        note.title = $inputs[0].value;
        note.message = $inputs[1].value;
        note.status = 'open';
        let r = Date.parse($inputs[7]);
        note.taskDate = $inputs[7].value;
        if (note.priority == null)
            note.priority = 0;
        localStorage
        $.ajax({
            method: "POST",
            url: "/createnote",
            data: note,
            success: ((data) => {
                window.location.href = '/';
            })

            //    success: function(data, textStatus) {
            //     if (data.redirect) {
            //         // data.redirect contains the string URL to redirect to
            //         window.location.href = data.redirect;
            //     }
            //     else {
            //         // data.form contains the HTML for the replacement form
            //         $("#myform").replaceWith(data.form);
            //     }
            // }
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
