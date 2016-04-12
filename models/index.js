var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                      "mongodb://localhost/pundit-tracker" );
var Pundit = require('./pundit');

var Prediction = require('./prediction');

module.exports.Pundit = Pundit;
module.exports.Prediction = Prediction;
