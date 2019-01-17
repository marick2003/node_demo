  //check auth auth
  var firebase=require('firebase');
  // Initialize Firebase
  var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId:  process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_messagingSenderId
  };
  firebase.initializeApp(config);
  module.exports=firebase;