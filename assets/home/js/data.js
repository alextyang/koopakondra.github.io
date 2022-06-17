
var data_providers = "bookmarks.json";
var selectedLink = null;

$(document).ready(function(){

  var text = document.getElementById("keywords");

  text.addEventListener('input', (event) => {

    var bookmarkLists = document.getElementsByClassName("bookmark-list");
    var value = text.value.trim().toLowerCase();
    var isFirst = true;

    [].forEach.call(bookmarkLists, function(bookmarkList){

      var iconWrappers = bookmarkList.childNodes;
      var shownCount = -1;

      [].forEach.call(iconWrappers, function(iconWrapper){

          var name = iconWrapper.childNodes[0].name.trim().toLowerCase();

          if (iconWrapper.childNodes[0].id === "bookmark-icon" && name.indexOf(value) === -1) {
            iconWrapper.className = 'isHidden';
            //console.log(value + "  not found in  " + name);
          }
          else {
            iconWrapper.className = '';
            //console.log(value + "  found in  " + name);
            shownCount++;

            if (isFirst && iconWrapper.childNodes[0].id === "bookmark-icon") {
              console.log(iconWrapper);
              selectedLink = iconWrapper.childNodes[0].href;
              isFirst = false;
            }
            else if (name.length > 0)
            {
              console.log("cancelled selection for " + name);
              selectedLink = null;
            }
          }

      });

      if (shownCount === 0){
        bookmarkList.childNodes[0].className = 'isHidden';
      }
      else {
        bookmarkList.childNodes[0].className = '';
      }

    });

    if (isFirst)
    {
      selectedLink = null;
    }

});

  $.getJSON(data_providers,
    function (data) {
      console.log(data);
      var partsource = $('#bookmark-template').html();
      var parttemplate = Handlebars.compile(partsource);
      Handlebars.registerPartial('bookmarkTemplate', parttemplate);

      var mysource = $('#section-template').html();
      var mytemplate = Handlebars.compile(mysource);
      var myresult = mytemplate(data)
      $('#bookmarks').html(myresult);
  });
});

window.addEventListener("keydown", focusOnSearch);

function focusOnSearch(e) {
	document.getElementById('keywords').focus();
}
