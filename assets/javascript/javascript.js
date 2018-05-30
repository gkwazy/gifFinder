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

function buttonMaker() {
    console.log("buttonMaker was called");
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button id='gifButton'>");
        newButton.addClass(topics[i]);
        newButton.attr("data-name", topics[i]);
        console.log(topics[i]);
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
    }
}

function gifSeletced(wantedGif) {

    if (topics.indexOf(wantedGif == -1)) {
        topics.push(wantedGif);
    }
    var quaryURL = "http://api.giphy.com/v1/gifs/search?q=" + wantedGif + "&api_key=krsfidvpUvoa9TjrFjFKcRZif8FtU45h&limit=200";

    $.ajax({
        url: quaryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            randomGif = Math.floor(Math.random() * 200);
            console.log(randomGif);
            ($("#gifs").prepend("<img src=" + (response.data[randomGif].images.original.url) + " height = 400 width = 400>\n"));
            ($("#gifs").prepend("<p>" + (response.data[randomGif].rating) + "</p>\n"));
        }
    })
    buttonMaker();
}