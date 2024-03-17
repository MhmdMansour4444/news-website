$(document).ready(function () {
  $.get(
    "http://localhost:4433/news-website/backend/connection.php",
    function (data) {
      let newsData = JSON.parse(data);
      if (Array.isArray(newsData) && newsData.length > 0) {
        let newsList = $("#news-list");
        newsList.empty();
        $.each(newsData, function (_, item) { //index not used so i omit it 
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
  )
});

$("#add-news-form").submit(function (event) {
  event.preventDefault();
  let formData = $(this).serialize(); // here we are refering to the  #add-news-form serializedata it into a format that can be sent in a POST request to the server.
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
          let newsData = JSON.parse(data);//parsing data so we return it as array else it gives an error
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
            $("#news-list").html("<p>No news articles found.</p>");//here if theres no news in database we put an indication
          }
        }
      );
      $("#add-news-form")[0].reset(); // ok so here we reset the form without having to access the dom directly.
    }
  );
});
