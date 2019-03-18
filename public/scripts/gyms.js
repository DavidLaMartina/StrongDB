$(document).ready(function(){
  $.getJSON("/api/gyms")
  .then(function(data){
    addGyms(data.gyms);
  })
  .catch(function(){
    console.log("No data");
  });
});

function addGyms(gyms){
  gyms.forEach(function(gym){
    var newGym = $('<tr></tr>');
    $('#gym-table').append(newGym);
    var newName = $('<td>'+gym.gym_name+'</td>');
    newGym.append(newName);
  })
}
