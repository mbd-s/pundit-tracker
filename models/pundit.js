var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Prediction = require('./prediction');

var PunditSchema = new Schema({
  name: String,
  cassandraScore: Number,
  predictions: [Prediction.schema]
});

var Pundit = mongoose.model('Pundit', PunditSchema);
module.exports = Pundit;
