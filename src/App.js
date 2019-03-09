import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Table from "./components/Products/Table/table";
import Router from "./Routers/Router";
<<<<<<< HEAD
//import './components/Clients/firebase/firebase.js'

=======
import Firebase, { FirebaseContext } from "./components/Firebase";
>>>>>>> 2ac9a1f8934f60a5f37ffc6636e7ec0e1d3cb2be

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}
export default App;
