$(document).ready(function(){
  initMap();

  $.getJSON("/api/gyms")
  .then(function(data){
    addGyms(data.gyms);
  })
  .catch(function(){
    console.log("No data");
  });

  $('#search').on('click', function(){
    searchGyms();
  })
});

function addGyms(gyms){
  gyms.forEach(function(gym){
    var newGym = $('<tr></tr>');
    $('#gym-table').append(newGym);
    var name = $('<td><a href=/gyms/' + gym.gym_id + '>' + gym.gym_name + '</a></td>');
    newGym.append(name);
    var city = $('<td>' + gym.city + '</td>');
    newGym.append(city);
    var state = $('<td>' + gym.state + '</td>');
    newGym.append(state);
    var city = $('<td>' + Math.round(gym.distance * 10) / 10 + '</td>');
    newGym.append(city);
  })
}
function searchGyms(){
  var equipment_id = $("#equipment").val();
  var equipment_qty = $("#quantity").val();
  var distance = $("#distance").val();

  // Get address and geoCode
  var apiKey = "AIzaSyCT2hTK5nAFb3g9g0_dElmTyh5j-UX1dXA";
  var street_address = encodeURIComponent($("#address").val());
  var geo_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street_address + "&key=" + apiKey;
  $.getJSON(geo_url)
  .then(function(data){
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;

    var url = "/api/gyms?" + "lat=" + lat + "&lng=" + lng + "&distance=" + distance;
    equipment = [];
    quantities = [];
    equipment.push(equipment_id);
    quantities.push(equipment_qty);

    url += "&equipment=" + JSON.stringify(equipment) + "&quantities=" + JSON.stringify(quantities);
    return $.getJSON(url)
  })
  .catch(function(data){
    var url = "/api/gyms?";
    equipment = [];
    quantities = [];
    equipment.push(equipment_id);
    quantities.push(equipment_qty);

    url += "&equipment=" + JSON.stringify(equipment) + "&quantities=" + JSON.stringify(quantities);
    return $.getJSON(url)
  })
  .then(function(data){
    clearGyms();
    addGyms(data.gyms);
    searchLocations($("#address").val(), distance, data.gyms);
  });
  // .catch(function(data){
  //   clearGyms();
  //   addGyms(data.gyms);
  //   searchLocations($("#address").val(), distance, data.gyms);
  // })
}
function clearGyms(){
  var rows = $("#gym-table").children();
  for (let row of rows){
    row.remove();
  }
}
