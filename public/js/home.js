
$("#clearBtn").on("click", function () {
    $.ajax({
        url: "/clear",
        type: 'DELETE',
        complete: function () {
            location.reload();
        }
    });
});
$(".scrapeBtn").on("click", function () {
    $.get("/scrape", (response) => {
        location.reload();
    });
});

$(".saveBtn").on("click", function () {
    const articleParent = $(this).parent().parent()
    const articleId = articleParent.attr("articleId");
    // console.log(articleId);
    $.post("/save/" + articleId, response => {
        // console.log(response);
        articleParent.parent().remove();
    });
    $.ajax({
        url: "/delete/" + articleId,
        type: 'DELETE',
        complete: function () {
            location.reload();
        }
    });

});