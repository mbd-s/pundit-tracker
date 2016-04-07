var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PunditSchema = new Schema({
  name: String,
  cassandraScore: Number
});

var Pundit = mongoose.model('Pundit', PunditSchema);

module.exports = Pundit;
