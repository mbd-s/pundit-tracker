
// once you get all successfully, then render each pundit & prediction accordingly
pundits.forEach( function(pundit) {

  pundit.predictions.forEach(prediction) {
    if(prediction.isChecked) {
      appendToPast(pundit);
    } else {
      appendToCurrent(pundit);
    }
  }
});

// specific render for past or current section
function appendToPast(pundit) {
  // make a pastPrediction template, and call it for ONE SINGLE ENTRY here
  // execute your append call with handlebars here for pastTemplate
  $('#targetPast').empty();
  $('#targetPast').append(pundit);
}

function appendToCurrent (pundit) {
  $('#targetCurrent').empty();
  $('#targetCurrent').append(pundit);
  // make a currentPrediction template, and call it for ONE SINGLE ENTRY here
  // execute your append call with handlebars here for currentTemplate
}


$('#targetCurrent').empty();
var punditHtml = pastTemplate({ pundit: allPundits });

$('#targetCurrent').append(punditHtml);
