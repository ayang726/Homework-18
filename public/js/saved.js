$(".deleteSavedBtn").on("click", function () {
    const articleId = $(this).parent().parent().attr("articleId");
    // console.log(articleId);
    $.ajax({
        url: "/deleteSaved/" + articleId,
        type: 'DELETE',
        complete: function () {
            location.reload();
        }
    });
});


$("#clearSavedBtn").on("click", function () {
    $.ajax({
        url: "/clearSaved",
        type: 'DELETE',
        complete: function () {
            location.reload();
        }
    });
});

$(".notesBtn").on("click", function () {
    $("#notes").empty();
    const articleId = $(this).parent().parent().attr("articleId");
    // console.log(articleId);
    $.get("/article/" + articleId, response => {
        console.log(response);

        $("#noteModal").attr("articleId", articleId);
        $("#noteModal #noteModalLabel").text(response.title)
        if (response.note) {
            response.note.forEach(aNote => {
                const html = `<li class="note">${aNote.body}</li>`
                $("#notes").append(html);
            });
        }
        $("#noteModal").modal('show');
    });
});

$("#noteModal form").on("submit", (e) => {
    e.preventDefault();

    const note = $("#noteModal form #newNote").val();
    const articleId = $("#noteModal").attr("articleId");
    console.log(note);

    $.post("/article/" + articleId, { note }, function (response) {
        console.log(response);
    });
    $("#noteModal form #newNote").val("");
    $("#noteModal").modal("hide");

});