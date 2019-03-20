$(document).ready(function(){
  activateMoreButton();
  $("#submitGym").on('click', function(){
    submitGym();
  })
  getEquipmentData();
});
function addMore(){
  var adder = $("#equipment-select").get(0);
  var lastRow = $("#equipment-select").children().last().get(0);
  var newRow = $(lastRow).clone();
  var moreButton = $("#more-button-container").last().get(0);
  $(adder).append($(newRow));
  $(moreButton).remove();
  activateMoreButton();
  addRemoveButton(lastRow);
}
function activateMoreButton(){
  $("#more-button").on('click', function(){
    addMore();
  });
}
function addRemoveButton(row){
  var removeButton = htmlToElement(
    "<div class='form-group col-md-1'>" +
      "<button type='button' class='btn btn-primary'>Remove</button>" +
    "</div<>");
  $(row).append(removeButton);
  $(removeButton).on('click', function(){
    $(row).remove();
  });
}
function htmlToElement(html) {
  // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}
function getGymData(){
  gymData = {
    gym_name: $("#gymName").get(0).value,
    gym_address: $("#gymAddress").get(0).value,
    gym_image: $("#gymImage").get(0).value,
    gym_owner: $("#gymOwner").get(0).value,
    gym_website: $("#gymWebsite").get(0).value,
    gym_instagram: $("#gymInstagram").get(0).value,
    gym_facebook: $("#gymFacebook").get(0).value,
    gym_phone: $("#gymPhone").get(0).value
  };
  return gymData;
}
function getEquipmentData(){
  var equipmentData = [];
  for (let row of $("#equipment-select").children()){
    equipmentData.push([
      $(row).find(".equipment-choice").get(0).value,
      $(row).find(".equipment-quantity").get(0).value
    ])
  }
  return equipmentData;
}
function submitGym(){
  var new_gym_id;
  gymData = getGymData();
  equipmentData = getEquipmentData();

  $.post('/api/gyms/', gymData)
  .then(function(data){
    new_gym_id = data.new.insertId;
    return $.ajax({
      url: '/api/gyms/' + new_gym_id,
      type: 'PUT',
      data: {inserts: equipmentData}
    });
  })
  .catch(function(data){
    console.log(data);
  })
  .then(function(data){
    window.location.replace('/gyms/' + new_gym_id);
  })
  .catch(function(data){
    console.log(data);
  })
}
