// SERVER-SIDE javascript

var express = require('express');
var app = express();
var db = require('./models');
var controllers = require('./controllers');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */
app.get('/', function homepage(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/pundit-view', function showPunditView(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/pundit-view.html');
});

app.get('/admin', function showAdminPage(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/admin.html');
});

/*
 * API Endpoints
 */

//show all API endpoints with available methods
 app.get('/api', controllers.api.index);

//show all pundits
 app.get('/api/pundit', controllers.pundits.index);

 // //show one pundit
 // app.get('/api/pundit/:punditId', controllers.pundits.index);

 //show all predictions (is this necessary, since all predictions will be shown in 'show one pundit'?)
 // app.get('/api/pundit/:punditId/prediction', controllers.pundits.index);

 // create a pundit
 // app.post('/api/pundit', controllers.pundits.create);

 //create a prediction embedded in pundit
  app.post('/api/pundit/:punditId/predictions/', controllers.pundits.create);

 //delete a pundit
 // app.delete('/api/pundit/:punditId', controllers.pundits.delete);
 //
 // //delete a prediction (admin only)
 // app.delete('api/prediction/:predictionId', controllers.punditsPredictions.delete);

 //update a pundit (admin only)
 // app.put('/api/pundit/:punditId', controllers.pundits.update);

 //update a prediction (admin only)
 //app.put('/api/prediction/:predictionId', controllers.punditsPredictions.update);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running on http://localhost:3000/');
});
