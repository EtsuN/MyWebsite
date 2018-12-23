var simpleData = {'beername': 'CA Kölsch',
                  'beerimg': 'img/ballastpoint/crisp-clear/02-ca-kolsch.png',
                  'index': 1};

var complexData = [
  {'beername': 'Sculpin IPA',
                    'beerimg': 'img/ballastpoint/rich-malty/01-sculpin-ipa.png',
                    'index': 1},
  {'beername': 'Manta Ray IPA',
                    'beerimg': 'img/ballastpoint/rich-malty/02-manta-ray-ipa.png',
                    'index': 2},
  {'beername': 'Fathom IPA',
                    'beerimg': 'img/ballastpoint/rich-malty/03-fathom-ipa.png',
                    'index': 3},
  {'beername': 'GF Sculpin IPA',
                    'beerimg': 'img/ballastpoint/rich-malty/04-gf-sculpin-ipa.png',
                    'index': 4},
  {'beername': 'Melon Dorado',
                    'beerimg': 'img/ballastpoint/rich-malty/05-melon-dorado.png',
                    'index': 5},
  {'beername': 'Longfin Lager',
                    'beerimg': 'img/ballastpoint/crisp-clear/01-longfin-lager.png',
                    'index': 6},
  {'beername': 'CA Kölsch',
                    'beerimg': 'img/ballastpoint/crisp-clear/02-ca-kolsch.png',
                    'index': 7},
  {'beername': 'Bonito Blonde',
                    'beerimg': 'img/ballastpoint/crisp-clear/03-bb.png',
                    'index': 8}

]

var beerData = {'beername': 'Aloha Sculpin',
                'beerimg': 'img/ballastpoint/rich-malty/01-sculpin-ipa.png',
                'type': 'Indian Pale Ale',
                'abv': '7.0% Alcohol Content'
                'desc': 'A hazy IPA with noles of guava and pineapple'
                'traits': ['fruity','bitter']
               };

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  console.log('hello world');

  // compile the template
  var source   = $("#beertemplate").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#templatedBeers");

  // BEGIN - STEP 1
  // start with a simple template
  var html = template(simpleData);
  console.log(html);
  parentDiv.append(html);

  // now iterate through the complexData list and keep appending:
  for (var i = 0; i < complexData.length; i++) {
    var curData = complexData[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
  }

  // END - STEP 1


  // BEGIN - STEP 2
  /*
  // when you first load the page, set a custom name if you have one:
  var name = localStorage.getItem('customName');
  if (name) {
    $("#myName").html(name);
  }
  // use localStorage to store your name
  $("#changeName").click(function() {
    var newName = prompt("What's your new name?");
    if (newName) {
      $("#myName").html(newName);
      localStorage.setItem('customName', newName);
    }
  });
  */
  // END - STEP 2


  // BEGIN - STEP 3
  /*
  // Use the URLSearchParams API to make fake-database queries using a URL
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  var queryParams = new URLSearchParams(window.location.search);
  var projectTitle = queryParams.get('project');
  console.log('query for', projectTitle);
  // to get this to work like in class, comment out the "STEP 1" parts
  // above between BEGIN and END.
  for (var i = 0; i < complexData.length; i++) {
    var curData = complexData[i];
    if (curData.title == projectTitle) {
      var curHtml = template(curData);
      parentDiv.append(curHtml);
    }
  }
  */
  // END - STEP 3
});
