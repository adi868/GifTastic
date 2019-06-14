var results = ["Bunny", "Horse", "Lemur", "Koala", "Cat", "Panda"];

// Function for displaying button data
function getButtons() {
    $("#buttons-view").empty();
    // Delete the content inside the buttons-view div prior to adding new results (this is necessary otherwise you will have repeat buttons)
    // Loop through the array of results, then generate buttons for each topic in the array
    for (var i = 0; i < results.length; i++) {
        var btn = $("<button>");
        btn.addClass("btnGif")
        btn.attr("data-results", results[i])
        btn.text(results[i])
        $("#buttons-view").append(btn)
    }
}

$("#find-gif").on("click", function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    event.preventDefault();
    // Code to grab the text the user types into the input field. Adds the new word into the results array
    results.push($("#gif-input").val().trim());
    $("#gif-input").val("");
    // The getButtons function is called, rendering the list of results buttons
    getButtons();
    getValues();
});

function clearSearch() {
    $("#gifs").empty();
}

function getValues() {
    $(".btnGif").on("click", function () {
        clearSearch();
        $(this).toggleClass('color-bg');
        $(".btnGif").not(this).removeClass('color-bg');
        var animal = $(this).attr("data-results");
        console.log(animal)
        // Storing our giphy API URL for an animal gif
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=DiCdrbZz2hQYAeVwOyJqvffQrkYJvdMi&limit=10";

        // Performing an AJAX GET request to our queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // After the data from the AJAX request comes back
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item (the 10 of them)
                for (var i = 0; i < results.length; i++) {

                    // Creating a paragraph tag with the result item's rating
                    var rating = $("<span>").text("Rating: " + results[i].rating);
                    // Creating and storing an image tag
                    var gifImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("style", "width:250px; height:250px")
                    gifImage.addClass("gif")
                    gifImage.attr("data-state", "still")
                    gifImage.attr("data-animate", results[i].images.fixed_height.url)
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url)
                    //flipping between still and moving image of gif
                    gifImage.attr("alt", "gif image");
                    $("#gifs").append(rating);
                    $("#gifs").append(gifImage);

                }
                

                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is. Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
                
            });
    });
}



getButtons();
getValues();