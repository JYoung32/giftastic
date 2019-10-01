//make a web page that displays GIFs
//create a click function for a button
//button will fire a search for GIFs using giphy api key
//display GIFs with ratings on the page
//make GIFs have a play and pause function by click event
//append a new button if a new item is searched



//make an array to store items to populate button containter
//make a click event to fire off search in the input form and append the new search in a button to the button container
//make a click event to display GIFs with the buttons in the button container


//initial values and api key
var buttons = ["dogs", "cats", "birds", "lizards"];
var key = "KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s";
var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=" + key + "&limit=10";


//generating buttons
function renderButtons() {

  $(".gif-buttons").empty();

  for (var i = 0; i < buttons.length; i++) {
    var buttonName = buttons[i];

    var button = $("<button>");
    button.addClass("btn btn-primary button-search m-2");
    button.attr("data-name", buttonName);
    button.text(buttonName);

    $(".gif-buttons").append(button);

  }
};

renderButtons();

//button click function
$(document).on("click", ".button-search",  function () {
  var value = $(this).attr("data-name");

  console.log(value);
  console.log("clicked");
  console.log(this);

  $("#gif-container").empty();
  ajaxCall(value);
});

//submit click function
$("#submit").on("click", function (event) {
  event.preventDefault();

  var value = $("#search").val();

  if(buttons.includes(value)){
    alert("You have already searched this")

    ajaxCall(value);

  }else{
    buttons.push(value);

  renderButtons();

  $("#gif-container").empty();

  ajaxCall(value);

  console.log(value);
  };
})

//ajax call function and display GIFs

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

      animalImg.attr("src", results[i].images.original_still.url);
      animalImg.attr("data-still", results[i].images.original_still.url);
      animalImg.attr("data-animate", results[i].images.original.url);
      animalImg.attr("data-state", "still");

      animalDiv.addClass("m-3 gif-click");
      animalDiv.append(p);
      animalDiv.append(animalImg);

      $("#gif-container").prepend(animalDiv);
    }
  });
};

$(document).on("click", ".gif-click", function(){
  console.log("clicked");

  var gif = $(this);

  var img = gif.find("img");

  var still = img.attr("data-still");
  var animate = img.attr("data-animate");
  var state = img.attr("data-state");

  if(state === "still"){
    img.attr({
      src: animate,
      "data-state": "animate"
    });
  }else{
    img.attr({
      src: still,
      "data-state": "still"
    });
  }
});