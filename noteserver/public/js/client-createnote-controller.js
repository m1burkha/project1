
;(function ($) {

    let note = {};

     $("#formnote").submit((event) => {
        event.preventDefault();

        let $inputs = $('#formnote :input');

        note.title = $inputs[0].value;
        note.message = $inputs[1].value;
        note.status = 'open';
        note.taskdate = $inputs[7].value;
        $.ajax({
            method: "POST",
            url:"/createnote",
            data : note
        })
    });

    $("body").on("click", ".selection", (event) => {
        event.preventDefault();
        note.importance = event.target.value;
    });

    $("#date-picker").datepicker({
        showOn: "button",
        buttonImage: "/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'dd/mm/yy'
    });

})(jQuery);
