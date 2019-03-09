import * as firebase from 'firebase';



var config = {
    apiKey: "AIzaSyBWKywEQEZy4xXwW9FoNLH89bfv80cZzgE",
    authDomain: "clientsdata-1b606.firebaseapp.com",
    databaseURL: "https://clientsdata-1b606.firebaseio.com",
    projectId: "clientsdata-1b606",
    storageBucket: "clientsdata-1b606.appspot.com",
    messagingSenderId: "1028717333178"
  };
  firebase.initializeApp(config);

  const database = firebase.database();


export default database;