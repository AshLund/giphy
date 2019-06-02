var topics= ["Taylor Swift", "cats", "Tom Brady", "Parks and Recreation", "Stranger Things", "Meghan Markle", "Princess Bride", "Star Wars", "Milwaukee Brewers", "Milwaukee Bucks"]

//turn topics into buttons

function renderButtons() { 
        //create an array to topics variable
    var buttonDiv=$("#person");
    var newButtonDiv=$("<button>" + topics.join("<button> ") + "</button>");
    buttonDiv.html(newButtonDiv)
    
}

renderButtons()

//click function

    $("#person").on("click", function() {
    var person=event.target.textContent
    console.log(person)
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dJZAoTE5oJZcb8BOEXkAExAi85YngNzf&limit=10"
    
//ajax
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        
    .then(function(response) {
        var results = response.data;
        console.log(results)
        //get rating
        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            var div=$("<div>");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

            
            var stillState=results[i].images.fixed_height_still.url
            var animateState= results[i].images.fixed_height.url
            

            var personImage = $("<img>");
            personImage.attr({
                "src" : stillState,
                "data-state": "still",
                "class": "images",
            })
            div.append(p)
           div.append(personImage);
           $("#giphs").prepend(div);
           console.log(giphs)

                } 
            }   
})


    })

    $("#user").on("click", function(event){
    event.preventDefault();
    var userInput=$("#thing").val().trim();
    console.log(userInput)
    topics.push(userInput)
    renderButtons()
})
        
        
        //make giphs move on click
        
        $(document).on("click", "img", function(){
            var source = $(this).attr("src");
	    var split = source.split("_")[1];
	    var animateSrc = source.replace("_s.gif", ".gif");
        var stillSrc = source.replace(".gif", "_s.gif");
		if (split == "s.gif"){
			$(this).attr("src", animateSrc);
		}else{
			$(this).attr("src", stillSrc);
		}
            
    });
        
    