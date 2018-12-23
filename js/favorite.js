$(document).ready(function() {
	loadBeerData();
	initializePage();
	loadFavoriteBeers();
});

function loadBeerData() {
    var displayed_beer_id = new Set();
    for (brewery_name in allbeer) {
    	var beers = allbeer[brewery_name];

		for (b in beers) {
			if (beers[b].id in displayed_beer_id) {
				continue;
			}
			var filters = "";
			for (t in beers[b].traits) {
				filters += " " + beers[b].traits[t];
			}
			$('#' + beers[b].style + 'section').append(
		      '<div class="filterDiv beer' + filters + '">' +
		        '<figure>' +
		          '<img ' + 'id="beer' + beers[b].id + '" class="beer" src="' + beers[b].img + '" alt="Name of Beer">' +
		          '<figcaption>' + beers[b].name + '</figcaption>' +
		        '</figure>' +
		      '</div>'
		    ); //deleted one </div>

			var bstyle;
			if (beers[b].style == 'ipa') {
				bstyle = 'India Pale Ale';
			}
			if (beers[b].style == 'lager') {
				bstyle = 'Lager';
			}
			if (beers[b].style == 'kolsch') {
				bstyle = 'Kolsch';
			}
			if (beers[b].style == 'porter') {
				bstyle = 'Porter';
			}
			if (beers[b].style == 'blonde') {
				bstyle = 'Blonde';
			}
			$('#modals').append(
		      '<div id="infoModal' + beers[b].id + '" class="beer-info-modal">' +
		        '<div class="beer-modal-content">' + 
		          '<span class="close">&times;</span>' + 
		          '<img class="beerinfo" src="' + beers[b].img + '" alt="' + beers[b].name + '">' + 
		          '<p class="beername">' + beers[b].name + '</p>' +
		          '<p class="beertype">' + bstyle + '</p>' +
		          '<p class="abv">' + beers[b].abv + '% Alcohol Content</p>' +
		          '<p class="beerdesc">' + beers[b].info + '</p>' +
		          '<div id="traits' + beers[b].id + '"></div>' +
		          '<a class="fav-btn"></a>' + 
		        '</div>' +
		      '</div>'
		    );

			for (var t = 0; t < beers[b].traits.length; t++) {
				$("#traits" + beers[b].id).append(
				  '<div class="trait">' +
					'<label>' +
					  '<input type="checkbox" value="1">' +
					  '<span>' + beers[b].traits[t] + '</span>' +
					'</label>' +
				  '</div>'
				);
			}
			
		    displayed_beer_id.add(beers[b].id);
		}
    }
}

function loadFavoriteBeers() {
	$(".filterDiv").hide();
  	var user = localStorage.getItem("currentUser");
  	var allfavlist = localStorage.getItem("favorite"); //will be JSON later
  	if (allfavlist) {
    	allfavlist = JSON.parse(allfavlist);
      	if (allfavlist[user]) {
        	favlist = allfavlist[user];
        	var i;
        	for (i = 0; i < favlist.length; i++)  {
          		var beer_id = "#infoModal" + favlist[i];
          		var beer_pic_id = "#beer" + favlist[i];
          		$(beer_pic_id).parent().parent().show();

          		$(beer_id + " div .fav-btn").addClass("liked");
        	}
      	}
  	}
  	$("body").css("display","block")
}

function initializePage() {

	$(".fav-btn").click(function() {
	    var beer_id = $(this).parent().parent().attr('id').replace(/[^\d]/g, ''); //qm1
	    var beer_num = beer_id;
	          
	    var user = localStorage.getItem("currentUser");
	    var allfavlist = localStorage.getItem("favorite"); //will be JSON later
	    var favlist = [];
	    if (allfavlist) {
	      allfavlist = JSON.parse(allfavlist);
	      if (allfavlist[user])
	        favlist = allfavlist[user];
	    }   
	    else {
	      allfavlist = {};
	    }

	    if ($(this).hasClass("liked")) {
	      $(this).removeClass("liked");
	      favlist.splice(favlist.indexOf(beer_num), 1);
	    }
	    else {
	      $(this).addClass("liked");
	      favlist.push(beer_num);
	    }

	    allfavlist[user] = favlist;
	    localStorage.setItem("favorite", JSON.stringify(allfavlist));
	});


    $(".qm").click(function() {
        var qm_id = $(this).attr('id').replace(/[^\d]/g, ''); //qm1
        var qmodal_id = "#qModal" + qm_id;
        $(qmodal_id).fadeIn();
    });
    
    $(".qclose").click(function() {
        $(this).parent("div").parent("div").fadeOut();
    });

    $("img.beer").click(function() {
        var beer_id = $(this).attr('id').replace(/[^\d]/g, ''); //qm1
        var infomodal_id = "#infoModal" + beer_id;
        $(infomodal_id).fadeIn();
    });

    $("div.beer-info-modal div .close").click(function() {
        $(this).parent("div").parent("div").fadeOut();
    });

	$(".open-nav").click(function () {
	    $(".sidenav").css("width", "250px");
	});

	$(".close-nav").click(function () {
	    $(".sidenav").css("width", "0");

	});
}
