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

function deletePunditSuccess(){

}

function deletePunditError(error){
  console.log('Error deleting the pundit', error);
}
