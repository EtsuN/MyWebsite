$(document).ready(function() {
  loadBeerData();
	initializePage();
  loadFavorite();
});

function loadBeerData() {
  //changed
  var curBrewery = localStorage.getItem('currentBrewery');
  var curBreweryIdx = localStorage.getItem('currentBreweryIndex');
  if (!curBrewery) {
    curBrewery = 'Ballast Point Brewing Co.';
    curBreweryIdx = 0;
  }
  $(".brewery-header").text(curBrewery);
  $(".brewery-header-address").text(breweries[curBreweryIdx].address);

  var beers = ['Ballast Point Brewing Co.']
  if (curBrewery in allbeer) {
    beers = allbeer[curBrewery]
  }
  else if (curBrewery == 'Duck Foot' || 'UCI Brewery' || 'San Diego Brewery' || 'Mike Hess' || 'New York Brewery'){
    beers = allbeer['Green Flash']
  }

  for (b in beers) {
    var filters = "";
    for (t in beers[b].traits) {
      filters += " " + beers[b].traits[t];
      filters += " " + beers[b].style;
    }
    $('#' + beers[b].style + 'section').append(
      '<div id="b' + beers[b].id +'" class="filterDiv beer' + filters + '">' +
        '<figure>' +
          '<img ' + 'id="beer' + beers[b].id + '" class="beer" src="' + beers[b].img + '" alt="Name of Beer">' +
          '<figcaption>' + beers[b].name + '</figcaption>' +
        '</figure>' +
      '</div>'
    ); //deleted one </div>
  }

  for (x in beers) {
    var bstyle;
    if (beers[x].style == 'ipa') {
      bstyle = 'India Pale Ale';
    }
    if (beers[x].style == 'lager') {
      bstyle = 'Lager';
    }
    if (beers[x].style == 'kolsch') {
      bstyle = 'Kolsch';
    }
    if (beers[x].style == 'porter') {
      bstyle = 'Porter';
    }
    if (beers[x].style == 'blonde') {
      bstyle = 'Blonde';
    }
    $('#modals').append(
      '<div id="infoModal' + beers[x].id + '" class="beer-info-modal">' +
        '<div class="beer-modal-content">' +
          '<span class="close">&times;</span>' +
          '<img class="beerinfo" src="' + beers[x].img + '" alt="' + beers[x].name + '">' +
          '<p class="beername">' + beers[x].name + '</p>' +
          '<p class="beertype">' + bstyle + '</p>' +
          '<p class="abv">' + beers[x].abv + '% Alcohol Content</p>' +
          '<p class="beerdesc">' + beers[x].info + '</p>' +
          '<div id="traits' + beers[x].id + '"></div>' +
          '<a class="fav-btn"></a>' +
        '</div>' +
      '</div>'
    );

    for (var t = 0; t < beers[x].traits.length; t++) {
      $("#traits" + beers[x].id).append(
          '<div class="trait">' +
            '<label>' +
              '<input type="checkbox" value="1">' +
              '<span>' + beers[x].traits[t] + '</span>' +
            '</label>' +
          '</div>'
        );
    }
  }
}

function loadFavorite() {
  var user = localStorage.getItem("currentUser");
  var allfavlist = localStorage.getItem("favorite"); //will be JSON later
  if (allfavlist) {
      allfavlist = JSON.parse(allfavlist);
      if (allfavlist[user]) {
        favlist = allfavlist[user];
        var i;
        for (i = 0; i < favlist.length; i++)  {
          var beer_id = "#infoModal" + favlist[i];
          $(beer_id + " div .fav-btn").addClass("liked");
        }
      }
  }
}

function initializePage() {

  $('input').click(function() {
    var curBrewery = localStorage.getItem('currentBrewery');
    if (!curBrewery) {
      curBrewery = 'Ballast Point Brewing Co.';
    }

    var beers = ['Ballast Point Brewing Co.']
    if (curBrewery in allbeer) {
      beers = allbeer[curBrewery]
    }
    else if (curBrewery == 'Duck Foot' || curBrewery == 'UCI Brewery' ||
             curBrewery == 'San Diego Brewery' ||
             curBrewery == 'Mike Hess' || curBrewery == 'New York Brewery'){
      beers = allbeer['Green Flash']
    }

    for (b in beers) {
      var show = 1;
      for (var fn = 0; fn < 12; fn ++) {
        if ($('#f' + fn).is(":checked")) {
          if ($('#b' + beers[b].id).hasClass($('#f' + fn).val())) {
            // do nothing
            console.log(beers[b].id);
          }
          else {
            show = 0;
          }
        }
      }
      if (show) {
        $('#b' + beers[b].id).css("display", "inline-block");
      } else {
        $('#b' + beers[b].id).css("display", "none");
      }
    }
    /*var category = $(this).val();

    var matchedItems = $('.' + category).each(function () {
      var anyChecked = false;
      var classArray = this.className.split(/\s+/);

      for(idx in classArray)
      {
        if ($('#filter-' + classArray[idx]).is(":checked"))
        {
          anyChecked = true;
          break;
        }
      }
      if (! anyChecked) $(this).hide();
      else $(this).show();
    });*/
  });

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

  $("#filter").click(function() {
    $("#myModal").fadeIn();
  });
  $("#finish").click(function() {
    $("#myModal").fadeOut();
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

  //Changed
  $("header").click(function () {
      /*breweries[b].address
      $(this).append(
      '<div id="infoModal' + beers[x].id + '" class="beer-info-modal">' +
        '<div class="beer-modal-content">' +
          '<span class="close">&times;</span>' +
          '<img class="beerinfo" src="' + beers[x].img + '" alt="' + beers[x].name + '">' +
          '<p class="beername">' + beers[x].name + '</p>' +
          '<p class="beertype">' + bstyle + '</p>' +
          '<p class="abv">' + beers[x].abv + '% Alcohol Content</p>' +
          '<p class="beerdesc">' + beers[x].info + '</p>' +
          '<div id="traits' + beers[x].id + '"></div>' +
          '<a class="fav-btn"></a>' +
        '</div>' +
      '</div>'
    );*/
    if ($(".header-dropdown").css("height") == "0px") {
      $(".header-dropdown").css("height", "40px");
    }
    else {
      $(".header-dropdown").css("height", "0px");
    }
      
  });

  $(".header-dropdown i").click(function () {
      window.location.href = "https://maps.google.com/?q=" + $(this).text();
  });
}
