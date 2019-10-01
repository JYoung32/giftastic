//make a web page that displays GIFs
//create a click function for a button
//button will fire a search for GIFs using giphy api key
//display GIFs with ratings on the page
//make GIFs have a play and pause function by click event
//append a new button if a new item is searched



//make an array to store items to populate button containter
//make a click event to fire off search in the input form and append the new search in a button to the button container
//make a click event to display GIFs with the buttons in the button container

// giphy API key = KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s
//giphy api url = api.giphy.com/v1/gifs/searchs

var buttons = ["dogs", "cats", "birds"];
var key = "KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s";
var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=" + key + "&limit=10";



function renderButtons() {

  $(".gif-buttons").empty();

  for (var i = 0; i < buttons.length; i++) {
    var buttonName = buttons[i];

    var button = $("<button>");
    button.addClass("btn btn-primary button-search");
    button.attr("data-name", buttonName);
    button.text(buttonName);

    $(".gif-buttons").append(button);

  }
};

renderButtons();

$(document).on("click", ".button-search",  function () {
  var value = $(this).attr("data-name");

  console.log(value);
  console.log("clicked");
  console.log(this);

  $("#gif-container").empty();
  ajaxCall($(this).attr("data-name"));
});

$("#submit").on("click", function (event) {
  event.preventDefault();

  var value = $("#search").val();

  buttons.push(value);

  renderButtons();

  $("#gif-container").empty();

  ajaxCall($("#search").val());

  console.log(value);
})

//ajax call function

function ajaxCall(value) {

  var search = queryURL + "&q=" + value;

  $.ajax({
    url: search,
    method: "GET"
  }).then(function (response) {

    console.log("clicked");
    console.log(queryURL);
    console.log(response);

    var results = response.data;
    for (var i = 0; i < results.length; i++) {

      var animalDiv = $("<div>");

      var p = $("<p>");

      p.text("Rating: " + results[i].rating);

      var animalImg = $("<img>");

      animalImg.attr("src", results[i].images.fixed_height.url);

      animalDiv.append(p);
      animalDiv.append(animalImg);

      $("#gif-container").prepend(animalDiv);
    }
  });
};

