// var db = require('../models');
//
// //create a prediction embedded in pundit
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
//
// module.exports.create = create;
