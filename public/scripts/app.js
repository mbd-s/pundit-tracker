/* CLIENT-SIDE JS
*/

var allPundits;
var allPredictions;
var pastTemplate;
var futureTemplate;

$(document).ready(function() {
  $('#date-picker').datepicker({});
  var pastSource = $('#templatePast').html();
  pastTemplate = Handlebars.compile(pastSource);

  var futureSource = $('#templateFuture').html();
  futureTemplate = Handlebars.compile(futureSource);

  //make an ajax call to my server
  $.ajax({
    method: "GET",
    url: "/api/pundit",
    success: punditSuccess,
    error: punditError
  });

  //TODO write punditCreate (or predictionCreate) function
  //on submitting form
  //prevent default
  //AJAX call
  // save to db
  //render entry

});

function punditSuccess(json){
console.log("Success!");
console.log(json);
//append past predictions to #targetPast
//append future predictions to #targetFuture
}

function punditError(json){
  console.log("Error!");
  console.log(error);
}
