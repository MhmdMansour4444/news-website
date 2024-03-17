$(document).ready(function() {
    $.get("http://localhost:4433/news-website/backend/fetchnews.php", function(data) {
        var newsList = $("#news-list");
        newsList.empty();
        $.each(data, function(index, item) {
            newsList.append("<div class='card'><div class='card-body'><h5 class='card-title'>" + item.title + "</h5><p class='card-text'>" + item.content + "</p></div></div>");
        });
    });
});

