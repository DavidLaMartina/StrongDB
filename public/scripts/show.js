$(document).ready(function(){
  $.getJSON("/api/gyms/" + gym_id)
  .then(function(data){
    initMap(data.gym);
    setGymMarker(data.gym);
  })
});

var map;
var starting_point;       // Starting address
var gym_marker;
var infoWindow;


function initMap(gym){
  var home = {lat: gym.gym_lat, lng: gym.gym_long};
  map = new google.maps.Map(document.getElementById('main-map'), {
    center: home,
    zoom: 14,
    gestureHandling: 'greedy',
    mapTypeId: 'roadmap',
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
  });
  infoWindow = new google.maps.InfoWindow();
}
function setGymMarker(gym){
  var latlng = new google.maps.LatLng(gym.gym_lat, gym.gym_long);
  var html = "<b>" + name + "</b> </br>" + gym.gym_address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}
