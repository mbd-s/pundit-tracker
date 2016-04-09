var db = require("./models");

var punditObjects = [{
  name: "David Brooks",
  cassandraScore: 1,
  image: ""
  //need to give them a cS? start at 0? 1?
  },
  {
  name: "Bill Kristol",
  cassandraScore: 1,
  image: ""
  },
  {
  name: "Bill O'Reilly",
  cassandraScore: 1,
  image: ""
  }
];

//possible to associate seed predictions data with seed pundit data?
var predictionObjects = [{
  predictionDescr: "I'm going to have a great lunch today",
  checkDate: "160604",
  sourceDescr: 'NY Times column, 6 April 2016',
  sourceUrl: 'http://www.nytimes.com',
  isChecked: true,
  truthValue: -1,
  notes: "Lunch was actually bad"
},
{
  predictionDescr: "The earth will still be around in six months.",
  checkDate: "161009",
  sourceDescr: 'My own head',
  sourceUrl: 'none',
  isChecked: false,
  truthValue: 1,
  notes: "Yep."
  }
];

db.Pundit.remove({}, function(err, deletedPundits){
  db.Pundit.create( punditObjects, function(err, successfulPundit){
    if (err) {
      return console.log('ERROR', err);
    }
    console.log("Success! Here's the database entry: ", successfulPundit);
  });
  db.Prediction.create( predictionObjects, function(err, successfulPrediction){
    if (err) {
      return console.log('ERROR', err);
    }
    console.log("Success! Here's the database entry: ", successfulPrediction);
    process.exit();
  });
console.log("Everything removed!");
});
