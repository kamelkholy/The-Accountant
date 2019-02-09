import React, { Component } from "react";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

class ClientList extends React.Component {
  state = {
    clients: [
      { clientName: "ahmed", id: "1" },
      { clientName: "moamed", id: "2" },
      { clientName: "omar", id: "3" }
    ]
  };
  // AddHandeler = () => {
  //   this.props.history.push("/add");
  // };
  render() {
    return (
      <div>
        <div>
          {this.state.clients.map(client => {
            return (
              <Link to={`/edit/${client.id}`}>
                <p>client name : {client.clientName}</p>
                <p>client ID : {client.id}</p>
              </Link>
            );
          })}
          <button variant="primary" onClick={this.AddHandeler}>
            Add Client
          </button>
        </div>
      </div>
    );
  }
}

export default ClientList;
