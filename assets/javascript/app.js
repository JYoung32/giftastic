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

$(document).ready(function(){
//array of button/search terms
var buttons = ["dog", "cat"];

//ajax call
    $(document).on("click", "button", function() {
        var key = "KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s";
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=" + key + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
    console.log("clicked");
    console.log(queryURL);
    console.log(response);

      // Step 2: since the image information is inside of the data key,
      // make a variable named results and set it equal to response.data

    var results = response.data;
      // ========================
    for (var i = 0; i < results.length; i++) {
      // Make a div with jQuery and store it in a variable named animalDiv.
        var animalDiv = $("<div>");
      // Make a paragraph tag with jQuery and store it in a variable named p.
        var p = $("<p>");
      // Set the inner text of the paragraph to the rating of the image in results[i].
        p.text("Rating: " + results[i].rating);
      // Make an image tag with jQuery and store it in a variable named animalImage.
        var animalImage = $("<img>");
      // Set the image's src to results[i]'s fixed_height.url.
        animalImage.attr("src", results[i].images.fixed_height.url);
      // Append the p variable to the animalDiv variable.
        animalDiv.append(p);
      // Append the animalImage variable to the animalDiv variable.
        animalDiv.append(animalImage);
      // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
        $("#gif-container").prepend(animalDiv);

        }
    });
});
// Function for making buttons
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $(".gif-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < buttons.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("gif btn btn-primary m-2");
        // Added a data-attribute
        a.attr("data-tag", buttons[i]);
        a.attr("data-animal", buttons[i]);
      // Provided the initial button text
        a.text(buttons[i]);
        // Added the button to the HTML
        $(".gif-buttons").append(a);
    }
};

$(".add-gif").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gif = $(".search-input").val().trim();

    // The movie from the textbox is then added to our array
    buttons.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

renderButtons();

});
