

var topics = ["Jimmy Fallon", "Kevin Hart", "Jennifer Lawrence", "Anna Kendrick", "Robert Downey Jr", "Chris Evans", "Chris Hemsworth", "Scarlet Johansen", "Chris Pratt", "Chris Pine"];

$(document).ready(function () {
    $("#gifs-appear-here").hide();
    renderButtons();
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("celeb-btn");
            a.attr("data-celeb", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    $(document).on("click", ".celeb-btn", displayCelebInfo);

    function displayCelebInfo() {

        var celeb = $(this).attr("data-celeb");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&rating=g&limit=10&api_key=odp3RujKlss2HBDsWZdZebTtgynpqcdn";
        $("#gifs-appear-here").show();
        // $("#gifs-appear-here").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifs = $("<img>");
                gifs.attr("src", results[i].images.fixed_height_still.url);
                gifs.attr("data-animate", results[i].images.fixed_height.url);
                gifs.attr("data-still", results[i].images.fixed_height_still.url);
                gifs.addClass("gif");
                gifs.attr("data-state", "still");

                celebDiv = $('<div class="newItem">');
                var rating = results[i].rating;
                var divRating = $("<p>").text("Rating: " + rating);

                celebDiv.append(divRating);
                celebDiv.append(gifs);


                $("#gifs-appear-here").prepend(celebDiv);
            }
        });
    }


    $("#add-person").on("click", function (event) {
        event.preventDefault();
        var celeb = $("#person-input").val().trim();

        topics.push(celeb);

        renderButtons();
    });

    $("#gifs-appear-here").on("click", ".gif", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // $(document).on("click", "celeb-btn", displayCelebInfo);

    renderButtons();

})