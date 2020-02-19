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
const buttons = ["dogs", "cats", "birds", "lizards"];
const key = "KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s";
const queryURL = `https://api.giphy.com/v1/gifs/search?&api_key=${key}&limit=10`;

//generating buttons
renderButtons = () => {
  $(".gif-buttons").empty();
  for (let i = 0; i < buttons.length; i++) {
    const buttonName = buttons[i];

    let button = $("<button>");
    button.addClass("btn btn-primary button-search m-2");
    button.attr("data-name", buttonName);
    button.text(buttonName);

    $(".gif-buttons").append(button);
  };
};

//ajax call function and display GIFs
ajaxCall = (value) => {
  const search = `${queryURL}&q=${value}`;
  $.ajax({
    url: search,
    method: "GET"
  }).then((response) => {
    const results = response.data;
    for (let i = 0; i < results.length; i++) {
      let giphyDiv = $("<div>");
      let p = $("<p>");
      p.text(`Rating: ${results[i].rating}`);

      let giphyImg = $("<img>");
      giphyImg.attr({
        "src": results[i].images.original_still.url,
        "data-still": results[i].images.original_still.url,
        "data-animate": results[i].images.original.url,
        "data-state": "still"
      });

      giphyDiv.addClass("m-3 gif-click");
      giphyDiv.append(p);
      giphyDiv.append(giphyImg);

      $("#gif-container").prepend(giphyDiv);
    }
  });
};

//submit buttons function
submit = (event) => {
  event.preventDefault();
  const value = $("#search").val();

  (buttons.includes(value)) ? (
    alert("You have already searched this"),
    ajaxCall(value)
  ) : (
    buttons.push(value),
    renderButtons(),
    $("#gif-container").empty(),
    ajaxCall(value)
  );
};

//initialize buttons
renderButtons();

//click functions
$("#submit").on("click", (event) => { submit(event) });

$(document).on("click", ".button-search",  function () {
  const value = $(this).attr("data-name");

  $("#gif-container").empty();
  ajaxCall(value);
});

$(document).on("click", ".gif-click", function(){
  const gif = $(this);
  const img = gif.find("img");
  const still = img.attr("data-still");
  const animate = img.attr("data-animate");
  const state = img.attr("data-state");

  (state === "still") ? (
    img.attr({
      src: animate,
      "data-state": "animate"
    })
  ) : (
    img.attr({
      src: still,
      "data-state": "still"
    })
  );
});