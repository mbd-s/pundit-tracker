var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PredictionSchema = new Schema({
  predictionDescr: String,
  checkDate: String,
  sourceDescr: String,
  sourceUrl: String,
  isChecked: {type: Boolean, default: false},
  truthValue: {type: Number, default: -1}
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
module.exports = Prediction;
