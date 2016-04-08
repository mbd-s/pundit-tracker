var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PredictionSchema = new Schema({
  name: String,
  checkDate: String,
  notes: String,
  sourceDescr: String,
  sourceUrl: String,
  submitterEmail: String,
  truthValue: Number
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
module.exports = Prediction;
