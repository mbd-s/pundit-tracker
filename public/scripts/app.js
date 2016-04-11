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
  console.log(pundit.prediction);
  var pastHtml = pastTemplate(pundit);
  //console.log(pastHtml);
  //$('#targetPast').empty();
  $('#targetPast').append(pastHtml);
}

function appendToCurrent(pundit) {
  var currentHtml = currentTemplate(pundit);
  //console.log(currentHtml);
  //$('#targetCurrent').empty();
  $('#targetCurrent').append(currentHtml);
}

function punditSuccess(json){
  pundits = json;
  pundits.forEach(function(pundit) {
    // console.log("predictions: ", pundit.predictions);
    if (pundit.predictions.length  <= 0){
      console.log('No predictions');
    } else {
      pundit.predictions.forEach(function(prediction){
        // console.log("prediction list: ", prediction);
        if (prediction.isChecked){
          var pastArray = [];
          pastArray.push(prediction);
          console.log("Temp past array", pastArray);
          console.log("---Incoming past prediction---: ", prediction);
          appendToPast(pundit);
        }
        else {
          console.log("Prediction", prediction);
          var currentArray = [];
          currentArray.push(prediction.predictionDescr, prediction.checkDate, prediction.sourceDescr, prediction.sourceUrl);
          console.log("Temp current array", currentArray);
          console.log("pundit", pundit);
          // console.log("---Incoming current prediction:--- ", prediction);
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
  // needs to filter to Past/Current targets
  $('#newPredictionForm input').val('');
  console.log(json);
  allPundits.push(json);
  appendToCurrent(json);
}

function newPredictionError(){
  console.log("Error saving prediction", error);
}
