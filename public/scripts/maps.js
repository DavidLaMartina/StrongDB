/* Code adapted from store locator example at
  https://developers.google.com/maps/solutions/store-locator/clothing-store-locator*/

var map;
var starting_point;       // Starting address
var markers = [];         // Gyms addresses
var infoWindow;
var locationSelect;

function initMap() {
  var home = {lat: 40.417134, lng: -105.019696};
  map = new google.maps.Map(document.getElementById('main-map'), {
    center: home,
    zoom: 11,
    gestureHandling: 'greedy',
    mapTypeId: 'roadmap',
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
  });
  infoWindow = new google.maps.InfoWindow();
  locationSelect = document.getElementById("main-locationSelect");
  locationSelect.onchange = function() {
    var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
    if (markerNum != "none"){
      google.maps.event.trigger(markers[markerNum], 'click');
    }
  };
}
function searchLocations(address, radius, gyms){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: address}, function(results, status){
    if(status == google.maps.GeocoderStatus.OK){
      searchLocationsNear(results[0].geometry.location, address, radius, gyms);
    }else{
      searchLocationsNear(null, null, null, gyms);
    }
  });
}
function clearLocations(){
  infoWindow.close();
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers.length = 0;
  if(starting_point){
    starting_point.setMap(null);
    starting_point = null;
  }

  locationSelect.innerHTML = "";
  var option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "See all results:";
  locationSelect.appendChild(option);
}
// Should be renamed to something like "place markers" - we already know gyms' locations
function searchLocationsNear(center, address, radius, gyms){
  clearLocations();
  var latlng;
  var bounds = new google.maps.LatLngBounds();

  // Create start marker if there is an starting_point
  if(center && address && radius){
    latlng = new google.maps.LatLng(center.lat(), center.lng());
    bounds.extend(latlng);
    createstarting_pointMarker(latlng, address);
  }

  // Create gym markers
  for (let i = 0; i < gyms.length; i++){
    latlng  = new google.maps.LatLng(gyms[i].gym_lat, gyms[i].gym_long);
    createOption(gyms[i].gym_name, gyms[i].distance, i);
    createMarker(latlng, gyms[i].gym_name, gyms[i].gym_address);
    bounds.extend(latlng);
  }

  map.fitBounds(bounds);
  locationSelect.style.visibility = "visible";
  locationSelect.onchange = function(){
    var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
    google.maps.event.trigger(markers[markerNum], 'click');
  };
}
function createstarting_pointMarker(latlng, address){
  var html = "<b>" + "Start" + "</b> </br>" + address;
  starting_point = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
  });
  google.maps.event.addListener(starting_point, 'click', function(){
    infoWindow.setContent(html);
    infoWindow.open(map, starting_point);
  });
}
function createMarker(latlng, name, address){
  var html = "<b>" + name + "</b> </br>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}
function createOption(name, distance, num){
  var option = document.createElement("option");
  option.value = num;
  option.innerHTML = name;
  locationSelect.appendChild(option);
}
