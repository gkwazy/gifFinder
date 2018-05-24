var topics = ["batman", "superman", "trees", "sand", "happy", "sad", "lol", "space", "dirt"];
//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

buttonMaker();

function buttonMaker() {
    console.log("buttonMaker was called");
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("gif");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
    }
}

function gifSearch() {

}