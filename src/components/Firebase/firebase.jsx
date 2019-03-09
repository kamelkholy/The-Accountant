import app from "firebase/app";

var config = {
  apiKey: "AIzaSyBVQDRFjFPmFGhacUrBzaYnBv4S8IojG3A",
  authDomain: "mydatabase-7cc8d.firebaseapp.com",
  databaseURL: "https://mydatabase-7cc8d.firebaseio.com",
  projectId: "mydatabase-7cc8d",
  storageBucket: "mydatabase-7cc8d.appspot.com",
  messagingSenderId: "281561413100"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
  apple = app;
}

export default Firebase;
