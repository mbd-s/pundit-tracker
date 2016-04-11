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
  pundits = json;
  console.log("Success! Pundits gotten.");
  pundits.forEach(function(pundit) {
    if(! pundit.predictions[0]){
      console.log('no predictions');
    } else {
      pundit.predictions.forEach(function(prediction){
        if (prediction.isChecked){
          console.log("Incoming past prediction: ", pundit);
          appendToPast();
        }
        else {
          console.log("Incoming current prediction: ", pundit);
          appendToCurrent();
        }
      });
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
