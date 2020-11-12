import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmepJY9ZBqqxcr_-qqwcPPCcswT8t94fA",
  authDomain: "stinkychat.firebaseapp.com",
  databaseURL: "https://stinkychat.firebaseio.com",
  projectId: "stinkychat",
  storageBucket: "stinkychat.appspot.com",
  messagingSenderId: "201585848192",
  appId: "1:201585848192:web:0c0827ff2b90e1181a1b65",
  measurementId: "G-G2R5TCVZJ5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
