
function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    var text = document.getElementById("keywords").value.replaceAll("+", "%2B");
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (key == 13) { // Search functions
        search(text);
    }

    if (text.trim().length < 2 && key === 8){
        document.getElementById("keywords").style = "border-color: rgba(159, 159, 159, 1);";
    }
    else {
        document.getElementById("keywords").style = "border-color: rgba(159, 159, 159, 0.1);";
    }




}

function search(text) {
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);

    if (selectedLink != null) {
        window.location = selectedLink;
    }
    else if (validURL(text)) {
        if (containsProtocol(text))
            window.location = text;
        else
            window.location = "https://" + text;
    } else {
        window.location = "https://www.google.com/search?q=" + text;
    }
}

// Source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function containsProtocol(str) {
    var pattern = new RegExp('^(https?:\\/\\/){1}.*', 'i');
    return !!pattern.test(str);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};



// http://suncalc.net/

// gradient colors from https://cdpn.io/rDEAl
var grads = [
  [{color:"00000c",position:0},{color:"00000c",position:0}],
  [{color:"020111",position:85},{color:"191621",position:100}],
  [{color:"020111",position:60},{color:"20202c",position:100}],
  [{color:"020111",position:10},{color:"3a3a52",position:100}],
  [{color:"20202c",position:0},{color:"515175",position:100}],
  [{color:"40405c",position:0},{color:"6f71aa",position:80},{color:"8a76ab",position:100}],
  [{color:"4a4969",position:0},{color:"7072ab",position:50},{color:"cd82a0",position:100}],
  [{color:"757abf",position:0},{color:"8583be",position:60},{color:"eab0d1",position:100}],
  [{color:"82addb",position:0},{color:"ebb2b1",position:100}],
  [{color:"94c5f8",position:1},{color:"a6e6ff",position:70},{color:"b1b5ea",position:100}],
  [{color:"b7eaff",position:0},{color:"94dfff",position:100}],
  [{color:"9be2fe",position:0},{color:"67d1fb",position:100}],
  [{color:"90dffe",position:0},{color:"38a3d1",position:100}],
  [{color:"57c1eb",position:0},{color:"246fa8",position:100}],
  [{color:"2d91c2",position:0},{color:"1e528e",position:100}],
  [{color:"2473ab",position:0},{color:"1e528e",position:70},{color:"5b7983",position:100}],
  [{color:"1e528e",position:0},{color:"265889",position:50},{color:"9da671",position:100}],
  [{color:"1e528e",position:0},{color:"728a7c",position:50},{color:"e9ce5d",position:100}],
  [{color:"154277",position:0},{color:"576e71",position:30},{color:"e1c45e",position:70},{color:"b26339",position:100}],
  [{color:"163C52",position:0},{color:"4F4F47",position:30},{color:"C5752D",position:60},{color:"B7490F",position:80},{color:"2F1107",position:100}],
  [{color:"071B26",position:0},{color:"071B26",position:30},{color:"8A3B12",position:80},{color:"240E03",position:100}],
  [{color:"010A10",position:30},{color:"59230B",position:80},{color:"2F1107",position:100}],
  [{color:"090401",position:50},{color:"4B1D06",position:100}],
  [{color:"00000c",position:80},{color:"150800",position:100}],
];

// "linear-gradient(to bottom, #020111 85%,#191621 100%)"
// {color:"20202c",position:0},{color:"515175",position:100}
function toCSSGradient(data)
{
  var css = "linear-gradient(45deg, ";
  var len = data.length;

  for (var i=0;i<len;i++)
  {
     var item = data[i];
     css+= " #" + item.color + " " + item.position + "%";
     if ( i<len-1 ) css += ",";
  }
  return css + ")";
}

function updateTime()
{
  d = moment();
  d.local();
  return d.hours();
}

function updateBasedOnNow()
{
  setCSSGradientByIndex(updateTime());
}

function setCSSGradientByIndex(nInx)
{
  if ( nInx != inx )
  {
    inx = nInx;
    var data = grads[inx];
    if ( data == null ) return;

    // convert data to gradient
    var css = toCSSGradient(data);

    // update the background
    $("#grad").css("background", css);


    // possible to change the foreground color on background change
    //$("#gradInfo").css("color", "#fff");
  }

  // always set time
  d.hours(inx);

  // update visible
  $("#time").html(d.format('h:mm'));
  //$("#time").html(d.format('h:mm[<span id="timeOfDay">]a[</span>]'));
  $("#date").html(d.format('MMMM Do YYYY'));

  // update in console
  console.log(d.format('[Just Good Design:\n]MMMM Do YYYY [\n]h:mm:ss a'));
}



function getLocation()
{
  if (navigator.geolocation)
  {
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
                    showLocation,
                    function(){showLocation(defaultLocation);},
                    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
  }
  else
  {
     showLocation(defaultLocation);
     alert("Geolocation is not supported by this browser");
  }
}

function showLocation(position)
{
  console.log(position);
  getSunInfo(position.coords.latitude,position.coords.longitude);
  getWeather(position.coords.latitude,position.coords.longitude,showWeather);
}

function kelvinToFDegrees(kelvin)
{
   return Math.round((1.8 * (kelvin - 273 ) + 32));
}

function showWeather(response)
{
  var newline = '<br>&nbsp&nbsp';
  var icon = response["weather"][0]["icon"];
  var iconImg = '<img align="middle" width="50" height="50"  src="http://openweathermap.org/img/w/' + icon + '" >';
  var locationName = response.name;
  var lat = response.coord.lat;
  var lon = response.coord.lon;
  var weatherDesc = response.weather[0].description;
  var fDegrees = kelvinToFDegrees(response.main.temp)+
"&#186;";

  var result = iconImg
  + "  " + weatherDesc + newline
  + locationName + ": " +
  + lat + ', ' + lon + newline;

  $("#temp").html(fDegrees);
  $("#weather").html(result);

  console.log(response);
  console.log(result);
}

function getWeather(lat,lon,callback)
{
  var api = "http://api.openweathermap.org/data/2.5/weather";
  api += "?lat=" + lat;
  api += "&lon=" + lon;

  $("#weatherId").html("Loading Weather Info...");
  $.ajax({
    url: api,
    dataType: 'jsonp',
    success:callback
    });
}

function getSunInfo(lat,lng)
{
  var data = new Date();
  var di = SunCalc.getDayInfo(data, lat, lng);
  var sunrisePos = SunCalc.getSunPosition(di.sunrise.start, lat, lng);
  var sunsetPos = SunCalc.getSunPosition(di.sunset.end, lat, lng);
  var sR = moment(di.sunrise.start);
  var sS = moment(di.sunset.end);
  var daylightHours = sS.diff (sR, 'hours');
  console.log("getDayInfo", di);
  console.log("daylightHours", daylightHours);
}

// props
var d = moment();
var h = updateTime();
var inx = -1;
var defaultLocation = {coords:{latitude:40.7144,longitude:-74.006}};

setCSSGradientByIndex(h);
getLocation();

// update every minute
var interval = setInterval(function(){updateBasedOnNow();},60 * 1000);
var interval2 = setInterval(function(){getLocation();},60 * 60 * 1000);
// update onClick
$("#gradInfo").click(function() {
  updateBasedOnNow();
});
