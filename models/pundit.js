var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PunditSchema = new Schema({
  name: String,
  cassandraScore: Number,
  // TODO embed PredictionSchema
});

var Pundit = mongoose.model('Pundit', PunditSchema);
module.exports = Pundit;
