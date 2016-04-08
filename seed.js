var db = require("./models");

var punditObjects = [{
  name: "David Brooks",
  cassandraScore: 1
  },
  {
  name: "Bill Kristol",
  cassandraScore: 1
  },
  {
  name: "Bill O'Reilly",
  cassandraScore: 6
  }
];

var predictionObjects = [{
  name: "I'm going to have a great lunch today",
  checkDate: "6 April 2016",
  sourceDescr: 'NY Times column, 6 April 2016',
  sourceUrl: 'http://www.nytimes.com',
  submitterName: "David Brooks",
  submitterEmail: "davidbrooks@obviouslyfakedomain.com",
  truthValue: -1,
  notes: "Lunch was actually bad"
},
{
  name: "",
  checkDate: "6 April 2016",
  sourceDescr: 'NY Times column, 6 April 2016',
  sourceUrl: '',
  submitterName: String,
  submitterEmail: String,
  truthValue: -1,
  notes: "Lunch was actually bad"
  }
];




db.Pundit.remove({}, function(err, deletedPundits){

  db.Pundit.create( punditObjects, function(err, successfulPundit){
    if (err) { return console.log('ERROR', err);}
    console.log("Success! Here's the database entry: ", successfulPundit);
    process.exit();
  });
console.log("Everything removed!");
});
