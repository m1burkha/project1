function getNoteList(callback) {

    $.ajax({
        method: "GET",
        url: "/notes/",
        success: (res) => {
            callback(res);
        }
    });
}

function editNoteById(id) {

    $.ajax({
        method: "GET",
        url: `/notes/${id}/`,
        success: (res) => {
            if (res) {
                $('#title').val(res['title']);
                $('#description').val(res['message']);
                $('#date-picker').val(res['taskDate']);
                if(res['priority'] !== 0) {
                    $(`input[value="${res['priority']}"]`).addClass("selection-border");
                }
            }
        }
    });
}

function updateNoteById(id, note) {

    $.ajax({
        method: "PUT",
        url: `/notes/${id}/`,
        data: note,
        success: () => {
            window.location.href = '/';
        }
    });
}

function toggleCheckBox(id, status) {
    $.ajax({
        method: "POST",
        url: `/notes/${id}/?status=${status}`,
        success: (() => {
            return 200;
        })
    });
}

function submitNote(note) {
    $.ajax({
        method: "POST",
        url: "/notes/",
        data: note,
        success: (() => {
            window.location.href = '/';
        })
    })
}

export default {getNoteList, editNoteById, updateNoteById, toggleCheckBox, submitNote};