/* CLIENT-SIDE JS
*/

var allPundits = [];
var pastTemplate;
var currentTemplate;

$(document).ready(function() {
  $('#date-picker').datepicker({});
  //TODO add function so dates in the past can't be chosen
  var sourcePast = $('#past-prediction-template').html();
  pastTemplate = Handlebars.compile(sourcePast);
  var sourceCurrent = $('#current-prediction-template').html();
  currentTemplate = Handlebars.compile(sourceCurrent);

  $.ajax({
    method: "GET",
    url: "/api/pundit",
    success: punditSuccess,
    error: punditError
  });

  $('#newPredictionForm').on('submit', function(e){
    e.preventDefault();
    var formData = $(this).serializeArray();
    console.log('New prediction serialized', formData);
    $.ajax({
      method: 'POST',
      url: '/api/pundit',
      data: formData,
      success: newPredictionSuccess,
      error: newPredictionError
    });
  });
});

function appendToPast(pundit) {
  $('#targetPast').empty();
  $('#targetPast').append(pundit);
}

function appendToCurrent (pundit) {
  $('#targetCurrent').empty();
  $('#targetCurrent').append(pundit);
}

function punditSuccess(json){
  pundit = json;
  console.log(pundit);
  console.log("Success! Pundits retrieved.");
  pundit.forEach( function(pundit) {
    pundit.predictions.forEach(prediction); {
      if(predictions.isChecked) {
        appendToPast(pundit);
        console.log("Incoming past predictions!");
      } else {
        appendToCurrent(pundit);
        console.log("Incoming current predictions!");
      }
    }
  });
}

function punditError(json){
  console.log("Error!", error);
}

function newPredictionSuccess(json){
  $('#newPredictionForm input').val('');
  console.log(json);
  allPundits.push(json);
  render();
}

function newPredictionError(){
  console.log("Error saving prediction", error);
}
