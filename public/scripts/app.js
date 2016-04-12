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
  var pastHtml = pastTemplate(pundit);
  $('#targetPast').append(pastHtml);
}

function appendToCurrent(pundit) {
  var hbPrediction = {
    // these capture the right data
    name  : pundit.name,
    photo : pundit.photo,
    //these all come back undefined
    predictionDescr: pundit.predictions.predictionDescr,
    sourceDescr: pundit.predictions.sourceDescr,
    sourceUrl : pundit.predictions.sourceUrl,
    isChecked: false
    };
  console.log(hbPrediction);
    // $('#targetCurrent').append(hbPrediction);
  var currentHtml = currentTemplate(pundit);
  $('#targetCurrent').append(currentHtml);
}

function punditSuccess(json){
  pundits = json;
  pundits.forEach(function(pundit) {
    if (pundit.predictions.length  <= 0){
      console.log('No predictions');
    } else {
      pundit.predictions.forEach(function(prediction){
        if (prediction.isChecked){
          appendToPast(pundit);
        }
        else {
          appendToCurrent(pundit);
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
  appendToCurrent(json);
}

function newPredictionError(){
  console.log("Error saving prediction", error);
}
