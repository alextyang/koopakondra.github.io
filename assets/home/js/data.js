
var data_providers = "bookmarks.json";
  
$(document).ready(function(){
  $.getJSON(data_providers,
    function (data) {
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