import "firebase/firestore";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "railway-diary.firebaseapp.com",
  databaseURL: "https://railway-diary.firebaseio.com",
  projectId: "railway-diary",
  storageBucket: "railway-diary.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export default firestore;
