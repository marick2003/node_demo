//database file
var admin = require("firebase-admin");
var serviceAccount = require("../testbot-993f2-firebase-adminsdk-62bb3-4c118cec4e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testbot-993f2.firebaseio.com"
});
var db= admin.database();


module.exports = db;
