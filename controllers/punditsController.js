var db = require('../models');

function index(req, res) {
  db.Pundit.find( {}, function(err, success){
    if (err){ return console.log("error", err); }
    res.json(success);
  });
}

function create(req, res) {
 // set the value of the pundit id
 var punditId = req.params.punditId;
 // store new prediction in memory with data from request body
 var newPrediction = new db.Prediction({name: req.body.name});
 // // find pundit in database by id and add new prediction
 db.Pundit.findOne({_id: punditId}, function (err, foundPundit) {
   foundPundit.predictions.push(newPrediction);
   foundPundit.save(function (err, savedPundit) {
     res.json(savedPundit);
   });
 });
}

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
