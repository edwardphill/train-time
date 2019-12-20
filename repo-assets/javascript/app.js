// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Frequency

// 1. Initialize Firebase

var config = {
  apiKey: "AIzaSyAmWd_3YG4gSLFPp6q2nwP_72n3XyxPTM4",
  authDomain: "train-time-nyc.firebaseapp.com",
  databaseURL: "https://train-time-nyc.firebaseio.com",
  storageBucket: "train-time-nyc.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#lineName")
    .val()
    .trim();
  var trainDestination = $("#destination")
    .val()
    .trim();
  var trainTime = $("#trainTimes")
    .val()
    .trim();
  var trainFreq = $("#frequency")
    .val()
    .trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    newName: trainName,
    newDestination: trainDestination,
    newTime: trainTime,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console

  console.log(newTrain.newName);
  console.log(newTrain.newDestination);
  console.log(newTrain.newTime);
  console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#lineName").val("");
  $("#destination").val("");
  $("#trainTimes").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.

  var trainName = childSnapshot.val().newName;
  var trainDestination = childSnapshot.val().newDestination;
  var trainTime = childSnapshot.val().newTime;
  var trainFreq = childSnapshot.val().freq;

  // Employee Info

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the employee start

  // Calculate the months worked using hardcore math

  // tFreq = train frquency entered in
  var tFrequency = trainFreq;

  // Time is tranTimes entered in by user
  var firstTime = "12:00";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
