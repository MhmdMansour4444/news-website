$(document).ready(function () {
  $.get(
    "http://localhost:4433/news-website/backend/connection.php",
    function (data) {
      let newsData = JSON.parse(data);
      if (Array.isArray(newsData) && newsData.length > 0) {
        let newsList = $("#news-list");
        newsList.empty();
        $.each(newsData, function (index, item) {
          newsList.append(
            "<div class='card'><div class='card-body'><h5 class='card-title'>" +
              item.title +
              "</h5><p class='card-text'>" +
              item.content +
              "</p></div></div>"
          );
        });
      } else {
        $("#news-list").html("<p>No news articles found.</p>");
      }
    }
  ).fail(function (xhr, status, error) {
    console.error("Error fetching news: " + error);
  });
});

$("#add-news-form").submit(function (event) {
  event.preventDefault();
  let formData = $(this).serialize();
  $.post(
    "http://localhost:4433/news-website/backend/connection.php",
    formData,
    function (response) {
      console.log(response);
      $.get(
        "http://localhost:4433/news-website/backend/connection.php",
        function (data) {
          let newsList = $("#news-list");
          newsList.empty();
          let newsData = JSON.parse(data);
          if (Array.isArray(newsData) && newsData.length > 0) {
            $.each(newsData, function (index, item) {
              newsList.append(
                "<div class='card'><div class='card-body'><h5 class='card-title'>" +
                  item.title +
                  "</h5><p class='card-text'>" +
                  item.content +
                  "</p></div></div>"
              );
            });
          } else {
            $("#news-list").html("<p>No news articles found.</p>");
          }
        }
      );
      $("#add-news-form")[0].reset();
    }
  );
});
