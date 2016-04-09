var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PredictionSchema = new Schema({
  predictionDescr: String,
  checkDate: String,
  sourceDescr: String,
  sourceUrl: String,
  isChecked: Boolean,
  truthValue: Number,
  notes: String
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
module.exports = Prediction;
