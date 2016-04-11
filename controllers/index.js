var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL);


module.exports.api = require('./apiController');
module.exports.pundits = require('./punditsController');
module.exports.punditsPredictions = require('./punditsPredictionsController');
