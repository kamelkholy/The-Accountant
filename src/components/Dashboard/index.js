import React, { Component } from "react";
import Bar from "./Bar";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Bar />
          </div>
          <div className="col-6">
            <Bar />
          </div>
        </div>
      </div>
    );
  }
}
