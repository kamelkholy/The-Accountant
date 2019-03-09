import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Table from "./components/Products/Table/table";
import Router from "./Routers/Router";
import Firebase, { FirebaseContext } from "./components/Firebase";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Temp />
      </div>
    );
  }
}

const Temp = () => {
  return (
    <FirebaseContext.Consumer>
      <Router />
    </FirebaseContext.Consumer>
  );
};

export default App;
