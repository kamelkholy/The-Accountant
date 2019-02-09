
import React, { Component } from "react";

import { Button } from "react-bootstrap";

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";




class ClientForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        formControl: {
          clientName: this.props.clientName ? this.props.clientName : "",
          id: this.props.id ? this.props.id : ""
        }
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleIdChange = this.handleIdChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleNameChange(event) {
      const formControl = this.state.formControl;
      formControl.clientName = event.target.value;
      this.setState({ formControl: formControl });
    }
    handleIdChange(event) {
      const formControl = this.state.formControl;
      formControl.id = event.target.value;
      this.setState({ formControl: formControl });
    }
  
    handleSubmit(event) {
      event.preventDefault();
     // clientsDemo.push(this.state.formControl);
      this.props.history.push("/");
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Client Name:</label>
              <input
                className="form-control form-control-lg"
                type="text"
                value={this.state.formControl.clientName}
                onChange={this.handleNameChange}
              />
            </div>
  
            <div className="form-group">
              <label>Client id:</label>
              <input
                className="form-control form-control-lg"
                type="text"
                value={this.state.formControl.id}
                onChange={this.handleIdChange}
              />
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      );
    }
  }


  export default ClientForm;