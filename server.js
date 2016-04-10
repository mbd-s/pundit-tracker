// SERVER-SIDE javascript

var express = require('express');
var app = express();
var db = require('./models');
var controllers = require('./controllers');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
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

 // create a pundit or add a prediction to an existing pundit
 app.post('/api/pundit', controllers.pundits.create);

 //delete a pundit (admin only)
 app.delete('/api/pundit/:punditId', controllers.pundits.remove);

 //update a pundit (admin only)
 app.put('/api/pundit/:punditId', controllers.pundits.update);


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running on http://localhost:3000/');
});
