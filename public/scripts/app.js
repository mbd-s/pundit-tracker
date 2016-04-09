/* CLIENT-SIDE JS
*/

var allPundits = [];
var allPredictions;
var pastTemplate;
var currentTemplate;

$(document).ready(function() {
  $('#date-picker').datepicker({});
  //TODO add function so dates in the past can't be chosen
  var sourcePast = $('#templatePast').html();
  pastTemplate = Handlebars.compile(sourcePast);
  var sourceCurrent = $('#templateCurrent').html();
  currentTemplate = Handlebars.compile(sourceCurrent);
  $.ajax({
    method: "GET",
    url: "/api/pundit",
    success: punditSuccess,
    error: punditError
  });

  //TODO write predictionFormCapture function
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

function render() {
  $('#targetPast').empty();
  $('#targetCurrent').empty();
  var punditHtml = pastTemplate({ pundit: allPundits });
  $('#targetPast').append(punditHtml);
  $('#targetCurrent').append(punditHtml);
}

function punditSuccess(json){
  allPundits = json;
  console.log("Success! Pundits rendered.");
  render();
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
