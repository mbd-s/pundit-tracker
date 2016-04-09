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

  });
  //on submitting form
  //prevent default
  //serialize
  //AJAX call
  // save to db
  //render entry

});

function render() {
  $('#targetPast').empty();
  $('#targetCurrent').empty();
  var punditHtml = pastTemplate({ pundit: allPundits });

  //append past predictions to #targetPast
  $('#targetPast').append(punditHtml);
    //append current predictions to #targetCurrent
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
