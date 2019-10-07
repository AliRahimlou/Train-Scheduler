var Config = {
    apiKey: "AIzaSyAeu4JbHlEgVaTPL9g2IuOxcEv31EZVH9A",
    authDomain: "whateveryoulike-bd657.firebaseapp.com",
    databaseURL: "https://whateveryoulike-bd657.firebaseio.com",
    projectId: "whateveryoulike-bd657",
    storageBucket: "",
    messagingSenderId: "591838744410",
    appId: "1:591838744410:web:1ee8e42de83e0a74a02d63",
    measurementId: "G-2YJ5F1C6DG"
};
// Initialize Firebase
firebase.initializeApp(Config);


var database = firebase.database();


var name;
var destination;
var train;
var frequency = 0;

$("#addTrain").on("click", function () {
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    train = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();


    database.ref().push({
        name: name,
        destination: destination,
        train: train,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("form")[0].reset();
});

database.ref().on("child_added", function (childSnapshot) {
    var minAway;
    var trainNew = moment(childSnapshot.val().train, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(trainNew), "minutes");
    var remainder = timeDiff % childSnapshot.val().frequency;
    var minAway = childSnapshot.val().frequency - remainder;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").append("<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + nextTrain +
        "</td><td>" + minAway + "</td></tr>");


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

