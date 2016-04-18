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
    var $punditId = $('input').val();
    console.log($(this).attr('data-id'));
    console.log('Updated prediction serialized', formData);
    $.ajax({
      method: 'PUT',
      /* TODO: You need to put a slash at the end of pundit below for this to work properly -jc */
      url: '/api/pundit'+$punditId,
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
  /* TODO: don't empty your html each time you call render. this will always give you an empty display of pundits. -jc */
  $('#targetAdmin').empty();
  var punditHtml = adminTemplate({ pundit: allPundits });
  /* TODO: don't append your html to the script tag. create another div with a different name and append your html to that div -jc*/
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
$('#updateMessageTarget input').val('');
$('#updateMessageTarget').append("Update successful.");
}

function updatedPredictionError(error){
  console.log('Error updating the pundit', error);
  $('#updateMessageTarget input').val('');
}
