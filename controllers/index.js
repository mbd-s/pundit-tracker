var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/pundit-tracker" );


module.exports.api = require('./apiController');
module.exports.pundits = require('./punditsController');
module.exports.punditsPredictions = require('./punditsPredictionsController');
