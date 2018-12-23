$(document).ready(function() {
	loadBreweryData();
	initializePage();
});

function loadBreweryData() {
    var location_option = new Set();
	for (b in breweries) {
		var location = breweries[b].location.toLowerCase();
		location = location.replace(/\s+/g, '');
		$('.brewery-list').append(
			'<div class="brewery ' + location + '" data-value="' + b + '">' +
			  '<a href="brewery_main.html">' +
			    '<img src="' + breweries[b].img + '">' +
			  '</a>' +
			  '<h3>' + breweries[b].name + '</h3>' +
			  '<p>' + breweries[b].address + ' &#9755;</p>' +
		    '</div>'
		);

		location_option.add(breweries[b].location);
	}

	for (let l of location_option) {
		location_class = l.toLowerCase().replace(/\s+/g, '');
		$('#locations').append($('<option>', {
		    value: location_class,
		    text: l
		}));
	}
}

function initializePage() {
	$("#locations").change(function () {
	    var location = document.getElementById("locations");
		var loc = "." + location.options[location.selectedIndex].value;
		$("div.brewery-list").children().show();
		if (loc != ".all") {
			$("div.brewery-list").children().not(loc).hide();
		}
	});

	$(".open-nav").click(function () {
	    $(".sidenav").css("width", "250px");
	});

	$(".close-nav").click(function () {
	    $(".sidenav").css("width", "0");
	});

	$(".brewery a").click(function () {
	    localStorage.setItem('currentBrewery', $(this).next().text());
	    localStorage.setItem('currentBreweryIndex', $(this).parent().attr('data-value'));
	});	

	$(".brewery h3, .brewery p").click(function () {
	    window.location.href = "https://maps.google.com/?q=" + $(this).parent().find("h3").text();
	});	

}
