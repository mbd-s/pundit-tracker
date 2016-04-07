var db = require("./models");

var punditObject = {
  name: "David Brooks",
  cassandraScore: 1
};

db.Pundit.remove({}, function(err, deletedPundits){

  db.Pundit.create( punditObject, function(err, successfulPundit){
    if (err) { return console.log('ERROR', err);}
    console.log("Success! Here's the actual database entry: ", successfulPundit);
    process.exit();
  });
console.log("Everything removed!");
});
