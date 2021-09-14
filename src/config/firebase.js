import * as firebase from "firebase";

import "firebase/storage";

import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD6NfzY7W6DBPcXJFMTA8xc5gblS8e8jWI",
  authDomain: "buscape-90a48.firebaseapp.com",
  databaseURL: "https://buscape-90a48-default-rtdb.firebaseio.com",
  projectId: "buscape-90a48",
  storageBucket: "buscape-90a48.appspot.com",
  messagingSenderId: "634056181582",
  appId: "1:634056181582:web:a84c051fcca6259728801f",
  measurementId: "G-7Q3N35M1WZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
