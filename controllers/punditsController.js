var db = require('../models');

function index(req, res) {
  db.Pundit.find( {}, function(err, pundits){
    if (err){ return console.log("error", err); }
    //console.log("Getting pundits inside index: ", pundits);
    res.json(pundits);
  });
}

function create(req, res) {
  db.Pundit.findOne({name: req.body.name}, function(err, foundPundit){
    if (err) { return console.log('error', err); }
    // if we already have a pundit with this name,
    if(foundPundit) {
    // push prediction from req.body into this foundPundit
    var newPrediction = new db.Prediction({
      predictionDescr: req.body.predictionDescr,
      checkDate: req.body.checkDate,
      sourceDescr: req.body.sourceDescr,
      sourceUrl: req.body.sourceUrl
    });
      console.log('NEW PREDICTION: ', newPrediction);
    foundPundit.predictions.push(newPrediction);
    foundPundit.save();
    res.json(foundPundit);
    } else {
      db.Pundit.create( req.body, function punditMaker(err, newPundit) {
        if (err) { return console.log('Error: ', err); }
        console.log("SAVED PUNDIT WITH NEW PREDICTION: ",newPundit);
        // enter prediction data into newPundit here
        res.json(newPundit);
      });
    }
  });
}

function remove(req,res){
  // set the value of the pundit id
  var punditId = req.params.punditId;
  db.Pundit.findOneAndRemove({ _id: punditId }, function (err, removedPundit) {
    if (err) { return console.log('Error: ', err); }
    res.json(removedPundit);
    console.log("Deleted ", removedPundit);
  });
}

// TODO fix: overwrites blank fields
function update(req, res){
  var punditId = req.params.punditId;
  db.Pundit.findOne({ _id: punditId }, function punditUpdater(err, foundPundit){
    if (err) { return console.log('Error: ', err); }
    foundPundit.name = req.body.name;
    foundPundit.cassandraScore = req.body.cassandraScore;
    foundPundit.photo = req.body.photo;
    foundPundit.predictions = req.body.predictions;
    foundPundit.save(function(err, updatedPundit) {
      if (err) { return console.log('Error: ', err); }
      console.log(updatedPundit);
      res.json(updatedPundit);
    });
});
}

module.exports.index = index;
module.exports.create = create;
module.exports.remove = remove;
module.exports.update = update;
