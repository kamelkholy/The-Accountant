import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Table from "./components/Products/Table/table";
import Router from "./Routers/Router";
//import './components/Clients/firebase/firebase.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Router />
        </div>
      </div>
    );
  }
}

export default App;
