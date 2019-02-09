import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Table from "./components/Products/Table/table";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div style={{ "margin-top": 80 + "px" }}>
          <Table />
        </div>
      </div>
    );
  }
}

export default App;
