var mongoose = require('mongoose');
mongoose.createConnection( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL);
var Pundit = require('./pundit');
var Prediction = require('./prediction');

module.exports.Pundit = Pundit;
module.exports.Prediction = Prediction;
