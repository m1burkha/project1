;(function ($) {

    let notelist = [];
    $(document).ready(function() {
        $.ajax({
            method: "GET",
            url:"/"
        }).done(function (data){
            notelist.concat(JSON.stringify(data));
        });
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

})(jQuery);
