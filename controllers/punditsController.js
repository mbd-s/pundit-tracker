var db = require('../models');

function index(req, res) {
  db.Pundit.find( {}, function(err, success){
    if (err){ return console.log("error", err); }
    res.json(success);
  });
}

function create(req, res) {
  console.log('body: ', req.body);
  db.Pundit.findOne({name: req.body.name}, function(err, foundPundit){
    if (err) { return console.log('error', err); }
    // if we already have a pundit with this name,
    if(foundPundit) {
    // push prediction from req.body into this foundPundit
    req.body.predictions.push(foundPundit);
    } else {
      db.Pundit.create( req.body, function punditMaker(err, newPundit) {
        if (err) { return console.log('error', err); }
        console.log(newPundit);
        // enter prediction data into newPundit here
        res.json(newPundit);
      });
    }
  });
}

// ////create a prediction embedded in pundit
// function create(req, res) {
//  // set the value of the pundit id
//  var punditId = req.params.punditId;
//  // store new prediction in memory with data from request body
//  var newPrediction = new db.Prediction({name: req.body.name});
//  // // find pundit in database by id and add new prediction
//  db.Pundit.findOne({_id: punditId}, function (err, foundPundit) {
//    foundPundit.predictions.push(newPrediction);
//    foundPundit.save(function (err, savedPundit) {
//      res.json(savedPundit);
//    });
//  });
// }



function remove(req,res){
  // set the value of the pundit id
  var punditId = req.params.punditId;
  db.Pundit.findOneAndRemove({ _id: punditId }, function (err, removedPundit) {
    res.json(removedPundit);
    console.log("Deleted ", removedPundit);
  });
}

module.exports.index = index;
module.exports.create = create;
module.exports.remove = remove;
