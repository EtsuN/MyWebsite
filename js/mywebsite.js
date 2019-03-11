$(document).ready(function() {
	initializePage();
});

function initializePage() {
	$(".nav-link").click(function () {
	    $(".collapse").collapse('toggle');
	});

	$("video").hover(function () {		
	    $(this).attr("controls","");
	    //window.alert("hi");
	}, function () {
		$(this).removeAttr("controls");
	}
	);

/*
	$("#locations").change(function () {
	    var location = document.getElementById("locations");
		var loc = "." + location.options[location.selectedIndex].value;
		$("div.brewery-list").children().show();
		if (loc != ".all") {
			$("div.brewery-list").children().not(loc).hide();
		}
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
*/
}
