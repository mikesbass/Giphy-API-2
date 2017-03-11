		var heroes = ["Superman", "Batman", "Hulk", "Groot"];
		// Function for displaying hero data
		function renderButtons()
		{
			// Deleting the hero buttons prior to adding new hero buttons
			// (this is necessary otherwise we will have repeat buttons)
			$("#images").empty();
			// Looping through the array of heroes
			for (var i = 0; i < heroes.length; i++)
			{
			// Then dynamicaly generating buttons for each hero in the array.
			// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
			var a = $("<button>");
			// Adding a class
			a.addClass("hero");
			// Adding a data-attribute with a value of the hero at index i
			a.attr("data-name", heroes[i]);
			// Providing the button's text with a value of the hero at index i
			a.text(heroes[i]);
			// Adding the button to the HTML
			$("#images").append(a);
			}
		}
		// This function handles events where one button is clicked
		$("#add-hero").on("click", function(event)
		{
			// event.preventDefault() prevents the form from trying to submit itself.
			// We're using a form so that the user can hit enter instead of clicking the button if they want
			event.preventDefault();
			// This line will grab the text from the input box
			var hero = $("#hero-input").val().trim();
			// The hero from the textbox is then added to our array
			heroes.push(hero);
			// calling renderButtons which handles the processing of our hero array
			renderButtons();
		});
		// Calling the renderButtons function at least once to display the initial list of heroes
		renderButtons();

	// Adding click event listen listener to all buttons
	// $("button").on("click", function()
	function displayInfo()
	{
			// Grabbing and storing the data-hero property value from the button
			var heroName = $(this).attr("data-name");
			// Constructing a queryURL using the hero name
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
			heroName + "&api_key=dc6zaTOxFJmzC&limit=10";
			// Performing an AJAX request with the queryURL
			$.ajax({
					url: queryURL,
					method: "GET"
					})

		// After data comes back from the request
		.done(function(response)
		{
		console.log(queryURL);
		console.log(response);
		// storing the data from the AJAX request in the results variable
		var results = response.data;
		// Looping through each result item
		for (var i = 0; i < results.length; i++)
		{
			// // Creating and storing a div tag
			// var heroDiv = $("<div>");
			// Creating a div with the class "item"
			var heroDiv = $("<div id='heroes-view'>");
			var urlStill = results[i].images.fixed_height_still.url;
			var urlPlay = results[i].images.fixed_height.url;
			// Creating a paragraph tag with the result item's rating
			var p = $("<p>").text("Rating: " + results[i].rating);
			// Creating and storing an image tag
			//gif needs still source to load, and data attributes to store the still and animated gifs for pausing function
			var heroImage = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill)
			.attr("data-animate", urlPlay).attr("data-state", "still");
			// Setting the src attribute of the image to a property pulled off the result item
			heroImage.attr("src", results[i].images.fixed_height.url);
			// Appending the paragraph and image tag to the heroDiv
			heroDiv.append(p);
			heroDiv.append(heroImage);
			// Prependng the heroDiv to the HTML page in the "#gifs-appear-here" div
			$("#heroes-view").prepend(heroDiv);
			}
				$(".gif").on("click", function()
				{
					// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
					var state = $(this).attr("data-state");
					// If the clicked image's state is still, update its src attribute to what its data-animate value is.
					// Then, set the image's data-state to animate
					// Else set src to the data-still value

					if (state === "still")
					{
						$(this).attr("src", $(this).attr("data-animate"));
						$(this).attr("data-state", "animate");
					}

					else
					{
						$(this).attr("src", $(this).attr("data-still"));
						$(this).attr("data-state", "still");
					}
			});
		});
	};

	//on click entire document to cover all elements named "hero" and run display function
   $(document).on("click", ".hero", displayInfo);