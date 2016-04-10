/* CLIENT-SIDE JS FOR ADMIN PAGE
*/
var adminTemplate;
var allPundits = [];

$(document).ready(function() {
  var sourceAdmin = $('#templateAdmin').html();
  adminTemplate = Handlebars.compile(sourceAdmin);

  $.ajax({
    method: "GET",
    url: "/api/pundit",
    success: punditSuccess,
    error: punditError
  });

  $('#updatePunditForm').on('submit', function(e){
    e.preventDefault();
    var formData = $(this).serializeArray();
    console.log('Updated prediction serialized', formData);
    $.ajax({
      method: 'PUT',
      url: '/api/pundit',
      data: formData,
      success: updatedPredictionSuccess,
      error: updatedPredictionError
    });
  });

  $('#targetAdmin').on('click', '.deleteBtn', function() {
      console.log('Clicked delete button to', '/api/pundit/'+$(this).attr('data-id'));
      $.ajax({
        method: 'DELETE',
        url: '/api/pundit/'+$(this).attr('data-id'),
        success: deletePunditSuccess,
        error: deletePunditError
      });
    });
});

function render() {
  $('#targetAdmin').empty();
  var punditHtml = adminTemplate({ pundit: allPundits });
  $('#templateAdmin').append(punditHtml);
}

function punditSuccess(json){
  allPundits = json;
  console.log("Success! Pundits rendered.");
  console.log(allPundits);
  render();
}

function punditError(error){
  console.log("Error rendering the pundit: ", error);
}

function deletePunditSuccess(json){
  var pundit = json;
  console.log(json);
  var punditId = pundit._id;
  console.log('Deleted pundit', punditId);
  for (var index = 0; index < allPundits.length; index++) {
    if(allPundits[index]._id === punditId) {
      allPundits.splice(index, 1);
      break;
    }
  }
  render();
}

function deletePunditError(error){
  console.log('Error deleting the pundit', error);
}

function updatedPredictionSuccess(json){
  console.log ("Succesfully updated pundit", json);
$('#updateMessageTarget').empty();
$('#updateMessageTarget').append("Update successful.");
}

function updatedPredictionError(error){
  console.log('Error updating the pundit', error);
}
