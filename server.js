// SERVER-SIDE javascript

var express = require('express');
var app = express();
var db = require('./models');


// serve static files from public folder
app.use(express.static(__dirname + '/public'));


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

 app.get('/api', function(req, res) {
  res.json({
    message: "Here you'll find information about using the site's API",
    documentation_url: "https://github.com/mbd-s/pundit-tracker",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/pundit", description: "Returns a list of all pundits"},
      {method: "GET", path: "/api/prediction", description: "Returns a list of all predictions"},
      {method: "GET", path: "/api/pundit/:id/prediction", description: "Returns a list of all predictions by a single pundit"},
      {method: "POST", path: "/api/prediction", description: "Adds a new prediction"},
      {method: "POST", path: "/api/pundit", description: "Adds a new pundit"},
      {method: "DELETE", path: "api/prediction/:id", description: "Deletes a prediction"},
      {method: "PUT", path: "/api/prediction/:id", description: "Updates a prediction"},
    ]
  });
});



app.get('/api/sanity', function sanity(req, res) {
    res.json({
        message: "Hello, World!"
    });
});

// TODO: Make 'api/pundit' endpoint
app.get('/api/pundit', function sanity(req, res) {

  db.Pundit.find( {}, function(err, success){
    if (err){ return console.log("error", err); }
    res.json(success);
  });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running on http://localhost:3000/');
});
