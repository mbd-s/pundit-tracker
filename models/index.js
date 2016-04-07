var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pundit-tracker');

var Pundit = require('./pundit');
var Prediction = require('./prediction');

module.exports.Pundit = Pundit;
module.exports.Prediction = Prediction;
