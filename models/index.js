var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pundit-tracker');

var Pundit = require('./pundit');

module.exports.Pundit = Pundit;
