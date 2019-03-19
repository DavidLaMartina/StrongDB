var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
  var home = {lat: 40.417134, lng: -105.019696};
  map = new google.maps.Map(document.getElementById('map'), {
    center: home,
    zoom: 11,
    gestureHandling: 'greedy',
    mapTypeId: 'roadmap',
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
  });
  infoWindow = new google.maps.InfoWindow();

  // searchButton = document.getElementById("searchButton").onclick = searchLocations;

  locationSelect = document.getElementById("locationSelect");
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
      searchLocationsNear(results[0].geometry.locationm, radius, gyms);
    }else{
      alert(address + "not found");
    }
  });
}
function clearLocations(){
  infoWindow.close();
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers.length = 0;

  locationSelect.innerHTML = "";
  var option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "See all results:";
  locationSelect.appendChild(option);
}
function searchLocationsNear(center, radius, gyms){
  clearLocations();

  var bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < gyms.length; i++){
    console.log(gyms);
    var latlng = new google.maps.LatLng(gyms[i].gym_lat, gyms[i].gym_long);
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
function createMarker(latlng, name, address){
  console.log(latlng);
  console.log(name);
  console.log(address);
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
