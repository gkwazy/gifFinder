var topics = ["batman", "superman", "trees", "sand", "happy", "sad", "lol", "space", "dirt"];

//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

buttonMaker();

$("#buttons").on("click", "#gifButton", function (event) {
    event.preventDefault();
    console.log("the name of the button " + ($(this).text()));
    gifSeletced($(this).attr("data-name"));

});

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    gifSeletced($("#searchInput").val());
});

$("#gifs").on("click", ".pic", function (event) {
    event.preventDefault();
    console.log("gif was clicked and ran")
    if ($(this).attr("data-state") == "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
        console.log("swtich to a animated gif")
    } else {
        $(this).attr("src", $(this).attr("data-stillPic"));
        $(this).attr("data-state", "still");
        console.log("changed to a still gif")
    }
});

function buttonMaker() {
    console.log("buttonMaker was called");
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button id='gifButton'type= 'button' class='btn btn-outline-light'>Dark</button>");
        newButton.addClass(topics[i]);
        newButton.attr("data-name", topics[i]);
        console.log(topics[i]);
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
    }
}

function gifSeletced(wantedGif) {
    console.log("this is what is being found in the indexOf " + topics.indexOf(wantedGif));
    if (topics.indexOf(wantedGif) < 0) {
        topics.push(wantedGif);
        console.log("the topic was pushed.")
    }
    console.log(topics)
    var quaryURL = "http://api.giphy.com/v1/gifs/search?q=" + wantedGif + "&api_key=krsfidvpUvoa9TjrFjFKcRZif8FtU45h&limit=200";

    $.ajax({
        url: quaryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            randomGif = Math.floor(Math.random() * 200);
            console.log(randomGif);
            if (response.data[randomGif].rating == "g" || response.data[randomGif].rating == "pg") {
                ($("#gifs").prepend("<p> Gif's Rating: " + (response.data[randomGif].rating) + "</p>"));
                ($("#gifs").prepend("<img src=" + (response.data[randomGif].images.original_still.url) +
                    " data-stillPic = " + response.data[randomGif].images.original_still.url + " data-animated = " +
                    response.data[randomGif].images.original.url + " height = 100% width = 100% data-state = still class = pic>\n"));

            } else (
                i--
            )
        }
    })
    buttonMaker();
}

