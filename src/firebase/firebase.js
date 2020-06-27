import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/analytics';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDAkRAr8H7JvA1d9IhAPi5Lex2VIWac_Ks",
    authDomain: "cruz-del-sur-56324.firebaseapp.com",
    databaseURL: "https://cruz-del-sur-56324.firebaseio.com",
    projectId: "cruz-del-sur-56324",
    storageBucket: "cruz-del-sur-56324.appspot.com",
    messagingSenderId: "407917778286",
    appId: "1:407917778286:web:1826b7b213b89c83d81d7f",
    measurementId: "G-CBEV913H6R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;