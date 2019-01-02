  var firebase=require('firebase');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTLe_wrvBO8b_RlQhLqqto6dvykDQDfGE",
    authDomain: "testbot-993f2.firebaseapp.com",
    databaseURL: "https://testbot-993f2.firebaseio.com",
    projectId: "testbot-993f2",
    storageBucket: "testbot-993f2.appspot.com",
    messagingSenderId: "837912342372"
  };
  firebase.initializeApp(config);
  module.exports=firebase;