cosole.log("seed has been called");
var db = require("./models");

var punditObjects = [{
  name: "David Brooks",
  cassandraScore: "",
  photo: "https://pbs.twimg.com/profile_images/418969883603263488/DrIZPihB_400x400.jpeg"
  //need to give them a cS? start at 0? 1?
  },
  {
  name: "Bill Kristol",
  cassandraScore: "",
  photo: "https://pbs.twimg.com/profile_images/521747547648311296/Z-2ftHoZ_400x400.png"
  },
  {
  name: "Bill O'Reilly",
  cassandraScore: "",
  photo: "http://vignette1.wikia.nocookie.net/drunken-peasants-podcast/images/6/6e/Bill.jpg/revision/latest?cb=20150810023621"
  }
];

// //possible to associate seed predictions data with seed pundit data?
// var predictionObjects = [{
//   predictionDescr: "I'm going to have a great lunch today",
//   checkDate: "160604",
//   sourceDescr: 'NY Times column, 6 April 2016',
//   sourceUrl: 'http://www.nytimes.com',
//   isChecked: true,
//   truthValue: -1,
// },
// {
//   predictionDescr: "The earth will still be around in six months.",
//   checkDate: "161009",
//   sourceDescr: 'My own head',
//   sourceUrl: 'none',
//   isChecked: false,
//   truthValue: 1,
//   }
// ];

db.Pundit.remove({}, function(err, deletedPundits){
  console.log(deletedPundits);
  db.Pundit.create( punditObjects, function(err, successfulPundit){
    console.log("db.Pundit.create just called");
    if (err) {
      return console.log('ERROR', err);
    }
    console.log("Success! Here's the database entry: ", successfulPundit);
    process.exit();
  });
  // db.Prediction.create( predictionObjects, function(err, successfulPrediction){
  //   if (err) {
  //     return console.log('ERROR', err);
  //   }
  //   console.log("Success! Here's the database entry: ", successfulPrediction);
  //   process.exit();
  // });
console.log("Everything removed!");
});
