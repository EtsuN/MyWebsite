$(document).ready(function() {
	initializePage();
	if ($(".carousel").length > 0)
		setupCarousel();

	scrollEffect(); //this is needed to avoid blank page


});

function initializePage() {
	$(".nav-link").click(function() {
	    $(".collapse").collapse('toggle');
	});

	$("video").hover(function() {		
	    $(this).attr("controls","");
	    //window.alert("hi");
	}, function() {
		$(this).removeAttr("controls");
	}
	);

	$(document).on("scroll", function() {
		scrollEffect()
	});


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

function scrollEffect() {
	var pageTop = $(document).scrollTop();
	var pageBottom = pageTop + $(window).height();

	var tags = $(".card, .container > h1, .container > .list-group");
	for (var i = 0; i < tags.length; i++) {
	    var tag = tags[i];
	    var tagTop = $(tag).offset().top;
	    var tagBottom = tagTop + $(tag).height() - 50;

		if (tagTop < pageBottom && tagBottom > pageTop) { 
	    	$(tag).addClass("visible");
	      	$(tag).removeClass("invisible-above");
	    }
	    else {
	      	$(tag).removeClass("visible");
	      	if (tagBottom < pageTop) {
	      		$(tag).addClass("invisible-above");
	      	}
	    }

	}
}

var carouselData = {};

carouselData['6'] = {
	name: 'DarkVader',
	description: 'DarkVader is a 3D computer game developed by OpenGL, with single player and multiplayer mode.',
	img: 'img/darkvader.png',
	background: 'background-black',
	span: '<span class="badge badge-secondary">OpenGL</span> <span class="badge badge-secondary">C++</span>'
};
carouselData['7'] = {
	name: 'Insincere Quora Question Predictor',
	description: 'Insincere Quora Question Predictor is a predictor that determines whether a Quora question is sincere or not developed by Python.',
	img: 'img/quora.png',
	background: '',
	span: '<span class="badge badge-secondary">Python</span>'
};
carouselData['5'] = {
	name: 'Beermenter',
	description: 'Beermenter is a mobile website that helps user to find a brewery with beers that match to their preference.',
	img: 'img/beermenter.png',
	background: 'background-black',
	span: '<span class="badge badge-secondary">HTML/CSS</span> <span class="badge badge-secondary">JavaScript</span>'
};
carouselData['2'] = {
	name: 'Maya Archaeology Project',
	description: 'This project aims to develop a dual-camera system to generate 3D models of the excavated tunnels around the Maya temples.',
	img: 'img/maya.png',
	background: 'background-black',
	span: '<span class="badge badge-secondary">ROS</span> <span class="badge badge-secondary">C++</span>'
};
carouselData['3'] = {
	name: 'Unilink',
	description: 'Unilink is an Android app that provides an online platform where university students can make rental deals with each other and find their future roommates.',
	img: 'img/unilink.png',
	background: 'background-black',
	span: '<span class="badge badge-secondary">Java</span> <span class="badge badge-secondary">Android Studio</span>'
};

function setupCarousel() {
	$(".carousel").carousel({
		interval: 2500,
		pause: "hover"
	});
	setTimeout(function() {
		$(".carousel").carousel('next');
	}, 750);

	var featureParam = getURLParameter("id");
	//if (featureParam.length == 0) {
	//	featureParam = "6723";
	//}
	for (var i = 0; i < featureParam.length; i++) { 
		var data = carouselData[featureParam[i]];
	    $('.carousel-inner').append(
	      '<div class="carousel-item ' + data["background"] + '">' +
	        '<a href="projects.html#section' + featureParam[i] + '"><img src="' + data["img"] + '" class="caro-img"></a>' +
		  	'<a href="projects.html#section' + featureParam[i] + '" class="carousel-caption">' +
		      '<p class="mb-0">Recent Projects:</p>' +
		      '<h3>' + data["name"] + '</h3>' +
		      '<h4>' + data["span"] + '</h4>' +
		      '<br/>' +
		      '<p>' + data["description"] + '</p>' +
		    '</a>' +
	      '</div>'
	    ); 
	    $('.carousel-indicators').append('<li data-target="#caro" data-slide-to="' + (i+1) + '"></li>');
	}
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) { 
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return "6723";
}
