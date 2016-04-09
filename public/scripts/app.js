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

  //make an ajax call to my server
  $.ajax({
    method: "GET",
    url: "/api/pundit",
    success: punditSuccess,
    error: punditError
  });

  //TODO write predictionFormCapture function
  $('#submitPrediction').on('submit', function(event){
    event.preventDefault();
    console.log('New prediction serialized', $(this).serializeArray());
    
  });
  //on submitting form
  //prevent default
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
  console.log(allPundits);
    //append current predictions to #targetCurrent
  $('#targetCurrent').append(punditHtml);
}

function punditSuccess(json){
  allPundits = json;
  console.log("Success!");
  console.log(json);
  render();
}

function punditError(json){
  console.log("Error!", error);
}
