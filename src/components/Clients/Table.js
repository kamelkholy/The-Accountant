
import React, { Component } from "react";

import { Button } from "react-bootstrap";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";



class ClientList extends React.Component {
    AddHandeler = () => {
      this.props.history.push("/add");
    };
    render() {
      return (
        <div>
          <div>
            {this.props.clients.map(client => {
              return (
                <Link to={`/edit/${client.id}`}>
                  <p>client name : {client.clientName}</p>
                  <p>client ID : {client.id}</p>
                </Link>
              );
            })}
            <Button variant="primary" onClick={this.AddHandeler}>
              Add Client
            </Button>
          </div>
        </div>
      );
    }
  }


  export default ClientList;